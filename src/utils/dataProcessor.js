import * as XLSX from 'xlsx';

export const fetchAndParseData = async () => {
    try {
        const response = await fetch('/React Assignment Historical NAV Report (1).xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Header is at index 4 (Row 5), Data starts at index 5 (Row 6)
        const rawData = jsonData.slice(5).filter(row => row[0]);

        let parsedData = rawData.map(row => {
            let date = row[0];
            if (typeof date === 'number') {
                const utc_days = Math.floor(date - 25569);
                const utc_value = utc_days * 86400;
                date = new Date(utc_value * 1000);
            } else if (typeof date === 'string') {
                const parts = date.split('-');
                if (parts.length === 3) {
                    date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                } else {
                    date = new Date(date);
                }
            } else {
                date = new Date(date);
            }

            return {
                date: date,
                nav: parseFloat(row[1]),
            };
        });

        // Sort Ascending (Oldest First)
        parsedData.sort((a, b) => a.date - b.date);

        return processMetrics(parsedData);
    } catch (error) {
        console.error("Error parsing Excel:", error);
        return null;
    }
};

const getReturn = (currentNav, pastNav, years = 0) => {
    if (!pastNav) return null;
    const absReturn = (currentNav - pastNav) / pastNav;
    if (years > 1) {
        // Annualize: (1 + abs)^(1/years) - 1
        return (Math.pow(1 + absReturn, 1 / years) - 1) * 100;
    }
    return absReturn * 100;
};

const findClosestDataPoint = (data, targetDate) => {
    // Find closest date <= targetDate
    // Data is sorted ascending. Iterate backwards.
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].date <= targetDate) {
            return data[i];
        }
    }
    return data[0];
};

const processMetrics = (data) => {
    if (!data || data.length === 0) return null;

    const startNav = data[0].nav;
    const lastPoint = data[data.length - 1];
    const lastNav = lastPoint.nav;
    const lastDate = lastPoint.date;

    // 1. Equity Curve (Rebased to 100)
    const equityCurve = data.map(d => ({
        date: d.date.toLocaleDateString('en-CA'), // YYYY-MM-DD
        value: (d.nav / startNav) * 100,
        originalNav: d.nav
    }));

    // 2. Drawdown
    let runningMax = -Infinity;
    let maxDrawdown = 0;
    const drawdownData = data.map(d => {
        if (d.nav > runningMax) runningMax = d.nav;
        const drawdown = ((d.nav - runningMax) / runningMax) * 100;
        if (drawdown < maxDrawdown) maxDrawdown = drawdown;
        return {
            date: d.date.toLocaleDateString('en-CA'),
            value: drawdown
        };
    });

    // 3. Trailing Returns
    const oneDayAgo = new Date(lastDate); oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const oneWeekAgo = new Date(lastDate); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date(lastDate); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const threeMonthsAgo = new Date(lastDate); threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const sixMonthsAgo = new Date(lastDate); sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const oneYearAgo = new Date(lastDate); oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const threeYearsAgo = new Date(lastDate); threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    // YTD: End of last year
    const startOfYear = new Date(lastDate.getFullYear(), 0, 1);
    const prevYearEnd = new Date(lastDate.getFullYear() - 1, 11, 31);

    const stats = {
        name: "Focused",
        ytd: getReturn(lastNav, findClosestDataPoint(data, prevYearEnd)?.nav),
        d1: getReturn(lastNav, findClosestDataPoint(data, oneDayAgo)?.nav),
        w1: getReturn(lastNav, findClosestDataPoint(data, oneWeekAgo)?.nav),
        m1: getReturn(lastNav, findClosestDataPoint(data, oneMonthAgo)?.nav),
        m3: getReturn(lastNav, findClosestDataPoint(data, threeMonthsAgo)?.nav),
        m6: getReturn(lastNav, findClosestDataPoint(data, sixMonthsAgo)?.nav),
        y1: getReturn(lastNav, findClosestDataPoint(data, oneYearAgo)?.nav), // No annualization needed for exact 1y, but function accounts for >1
        y3: getReturn(lastNav, findClosestDataPoint(data, threeYearsAgo)?.nav, 3),
        si: getReturn(lastNav, startNav, (lastDate - data[0].date) / (1000 * 60 * 60 * 24 * 365.25)), // Annualized SI
        dd: ((lastNav - runningMax) / runningMax) * 100, // Current Drawdown
        maxDd: maxDrawdown
    };

    return {
        equityCurve,
        drawdownData,
        trailingStats: [stats], // Array for table
        lastUpdated: lastDate.toISOString().split('T')[0]
    };
};
