import React, { useEffect, useState } from 'react';
import { fetchAndParseData } from '../utils/dataProcessor';
import StatsTable from '../components/StatsTable';
import EquityChart from '../components/EquityChart';
import DrawdownChart from '../components/DrawdownChart';
import { Loader2, Download } from 'lucide-react';

const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const processedData = await fetchAndParseData();
                setData(processedData);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
                Failed to load portfolio data.
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-8 md:p-12 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-primary">Focused</h1>
                <button className="text-accent text-sm flex items-center gap-1 hover:underline">
                    <Download className="w-4 h-4" /> Download Data
                </button>
            </div>

            {/* Trailing Returns */}
            <StatsTable data={data.trailingStats} />

            {/* Charts */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-lg font-bold text-primary">Equity curve</h2>
                    <div className="flex gap-4 text-xs text-secondary">
                        <div className="border border-gray-200 px-3 py-1 rounded">From date: <span className="text-primary font-medium">2019-01-01</span></div>
                        <div className="border border-gray-200 px-3 py-1 rounded">To date: <span className="text-primary font-medium">2024-04-24</span></div>
                    </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="mb-0">
                        <EquityChart data={data.equityCurve} />
                    </div>
                    <div className="mt-0 h-48">
                        <DrawdownChart data={data.drawdownData} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
