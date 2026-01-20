import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EquityChart = ({ data }) => {
    if (!data) return null;

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="date"
                        tick={false}
                        axisLine={false}
                        height={0}
                    />
                    <YAxis
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => value.toFixed(0)}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [Number(value).toFixed(2), 'Rebased NAV']}
                        labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px' }}
                    />
                    {/* Green Line for Portfolio */}
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        name="Focused"
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    {/* Blue Line for NIFTY50 */}
                    <Line
                        type="monotone"
                        dataKey="niftyValue"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="NIFTY50"
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EquityChart;
