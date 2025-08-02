import ChartDashboard from '~/components/admin/ChartDashboard';
import StatCard from '~/components/ui/StatCard';
import { getDashboardStats, getLatestEvents, getMonthlySalesData } from '~/libs/data';

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
    const stats = await getDashboardStats();
    const latestEvents = await getLatestEvents();
    const salesData = await getMonthlySalesData(); 

    return (
        <div className='h-screen'>
            <h1 className="text-3xl font-bold tracking-tight text-white">
                Dashboard
            </h1>
            <p className="mt-1 text-zinc-400">
                Ringkasan statistik dari aplikasi MyTicketX.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Pengguna" value={stats.totalUsers.toLocaleString('id-ID')} />
                <StatCard title="Total Event Aktif" value={stats.totalEvents.toLocaleString('id-ID')} />
                <StatCard title="Total Tiket" value={stats.totalTickets.toLocaleString('id-ID')} />
                <StatCard title="Tiket Terjual" value={stats.totalTicketsSold.toLocaleString('id-ID')} />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 p-6 bg-[#202027] border border-zinc-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Grafik Penjualan Tiket</h3>
                    <div className="mt-4 h-64 bg-zinc-800/50 rounded flex items-center justify-center text-zinc-500 p-2">
                        <ChartDashboard data={salesData} />
                    </div>
                </div>

                <div className="lg:col-span-2 p-6 bg-[#202027] border border-zinc-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Event Terbaru Dibuat</h3>
                    
                    <ul className="mt-4 space-y-3">
                        {latestEvents.length > 0 ? (
                            latestEvents.map(event => (
                                <li key={event.id} className="text-zinc-400 text-sm truncate">
                                    {event.name}
                                </li>
                            ))
                        ) : (
                            <li className="text-zinc-500 text-sm italic">Belum ada event yang dibuat.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;