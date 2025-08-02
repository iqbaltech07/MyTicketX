"use client";

import React, { useTransition } from 'react';
import { Select, SelectItem, Button } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaDownload } from 'react-icons/fa';

const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
}));

const SalesSummaryFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentMonth = (new Date().getMonth() + 1).toString();
    const selectedMonth = searchParams.get('month') || currentMonth;
    const selectedYear = searchParams.get('year') || currentYear.toString();

    const handleFilterChange = (type: 'month' | 'year', value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);

        startTransition(() => {
            router.push(`/admin/sales-summary?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <Select
                    label="Bulan"
                    selectedKeys={[selectedMonth]}
                    onChange={(e) => handleFilterChange('month', e.target.value)}
                    className="w-40"
                    classNames={{ value: "!text-black", selectorIcon: "!text-black" }}
                >
                    {months.map((month) => (
                        <SelectItem key={month.value} className='!text-black'>
                            {month.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Tahun"
                    selectedKeys={[selectedYear]}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-32"
                    classNames={{ value: "!text-black", selectorIcon: "!text-black" }}
                >
                    {years.map((year) => (
                        <SelectItem key={year.value} className='!text-black'>
                            {year.label}
                        </SelectItem>
                    ))}
                </Select>
                {isPending && <p className='text-sm text-zinc-400'>Memuat data...</p>}
            </div>
            <Button className="bg-white text-black" size='sm'>
                <FaDownload className='mr-2' />
                Unduh Laporan (Excel)
            </Button>
        </div>
    );
};

export default SalesSummaryFilter;