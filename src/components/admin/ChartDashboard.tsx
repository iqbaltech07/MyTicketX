"use client"

import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

type ChartData = {
    name: string; 
    "Tiket Terjual": number;
};

type ChartDashboardProps = {
    data: ChartData[];
}

const ChartDashboard = ({ data }: ChartDashboardProps) => {
    return (
        <div className='h-64 w-full'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                    <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: "#202027", 
                            border: "1px solid #3f3f46",
                            borderRadius: "0.5rem"
                        }} 
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="Tiket Terjual" 
                        stroke="#5AE3A8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartDashboard