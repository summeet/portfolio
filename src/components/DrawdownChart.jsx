import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DrawdownChart = ({ data }) => {
    if (!data) return null;

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={50}
                    />
                    <YAxis
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value.toFixed(0)}%`}
                        domain={[dataMin => Math.floor(dataMin), 0]}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`${value.toFixed(2)}%`, 'Drawdown']}
                        labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDrawdown)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DrawdownChart;
