import React from 'react';
import { ArrowDown } from 'lucide-react';

const StatsTable = ({ data }) => {
    if (!data) return null;

    const columns = [
        { label: 'NAME', key: 'name', align: 'left' },
        { label: 'YTD', key: 'ytd' },
        { label: '1D', key: 'd1' },
        { label: '1W', key: 'w1' },
        { label: '1M', key: 'm1' },
        { label: '3M', key: 'm3' },
        { label: '6M', key: 'm6' },
        { label: '1Y', key: 'y1' },
        { label: '3Y', key: 'y3' },
        { label: 'SI', key: 'si' },
        { label: 'DD', key: 'dd' },
        { label: 'MAXDD', key: 'maxDd' },
    ];

    const formatValue = (val, key) => {
        if (key === 'name') return val;
        if (val === null || val === undefined) return '-';
        return `${val.toFixed(1)}%`;
    };

    return (
        <div className="w-full bg-white mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-primary">Trailing Returns</h2>
                <span className="text-accent cursor-pointer hover:bg-green-50 p-1 rounded">
                    <ArrowDown className="w-4 h-4" />
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`py-3 px-2 text-xs font-semibold text-secondary uppercase tracking-wider ${col.align === 'left' ? 'text-left pl-4' : 'text-center'}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                {columns.map((col) => {
                                    const val = row[col.key];
                                    /* Make Name bold, others normal */
                                    const isName = col.key === 'name';
                                    return (
                                        <td
                                            key={col.key}
                                            className={`py-4 px-2 ${isName ? 'font-medium text-primary text-left pl-4' : 'text-secondary'}`}
                                        >
                                            {formatValue(val, col.key)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Note: Returns above 1 year are annualized.</p>
        </div>
    );
};

export default StatsTable;
