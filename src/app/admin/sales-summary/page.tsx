import React from 'react';
import StatCard from '~/components/ui/StatCard';
import SalesSummaryFilter from '~/components/admin/SalesSummaryFilter'; // Impor komponen baru

type SalesSummaryPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SalesSummaryPage = async ({ searchParams }: SalesSummaryPageProps) => {
  const month = searchParams.month as string || (new Date().getMonth() + 1).toString();
  const year = searchParams.year as string || new Date().getFullYear().toString();
  
  const summaryData = {
    totalSales: 25000000,
    transactionCount: 120,
    ticketsSold: 350,
    topEvent: 'Konser Merdeka',
    averagePerTransaction: 208333,
  };
  
  const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('id-ID', { month: 'long' });

  return (
    <div className="h-screen pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Ringkasan Penjualan
          </h1>
          <p className="mt-1 text-zinc-400">
            Analisis penjualan tiket berdasarkan periode yang dipilih.
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-[#202027] border border-zinc-800 rounded-lg">
        <SalesSummaryFilter />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Penjualan" value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summaryData.totalSales)} />
        <StatCard title="Jumlah Transaksi" value={summaryData.transactionCount} />
        <StatCard title="Tiket Terjual" value={summaryData.ticketsSold} />
        <StatCard title="Event Terlaris" value={summaryData.topEvent} />
        <StatCard title="Rata-rata/Transaksi" value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summaryData.averagePerTransaction)} />
      </div>

       <div className="mt-10 p-6 bg-[#202027] border border-zinc-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Ringkasan Otomatis</h3>
        <div className="text-zinc-400 space-y-2 leading-relaxed">
            <p>📊 <span className='font-bold'>Ringkasan Bulanan ({monthName} {year})</span></p>
            <p>Total penjualan bulan ini mencapai <span className='font-bold text-green-400'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summaryData.totalSales)}</span> dengan {summaryData.transactionCount} transaksi berhasil diselesaikan.</p>
        </div>
      </div>
      
       <div className="mt-10">
         <h3 className="text-lg font-semibold text-white mb-4">Detail Transaksi</h3>
         <div className="p-6 bg-[#202027] border border-zinc-800 rounded-lg text-center text-zinc-500">
            <p>(Tabel detail transaksi akan ditampilkan di sini)</p>
         </div>
       </div>

    </div>
  );
};

export default SalesSummaryPage;