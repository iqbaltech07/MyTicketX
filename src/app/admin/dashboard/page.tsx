import ChartDashboard from '~/components/admin/ChartDashboard';
import PageContainer from '~/components/layouts/PageContainer';
import StatCard from '~/components/ui/StatCard'
import { getMonthlySalesData } from '~/libs/data'

const getDummyStats = async () => ({
    totalUsers: 1250,
    totalEvents: 48,
    totalTicketsSold: 8765,
    totalTickets: 12000
});

const Dashboard = async () => {
    const stats = await getDummyStats();
    const salesData = await getMonthlySalesData()

    return (
        <PageContainer>
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
                    <div className="mt-4 h-64 bg-zinc-800 rounded flex items-center justify-center text-zinc-500">
                        <ChartDashboard data={salesData}/>
                    </div>
                </div>

                <div className="lg:col-span-2 p-6 bg-[#202027] border border-zinc-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">Event Terbaru Dibuat</h3>
                    <ul className="mt-4 space-y-3">
                        <li className="text-zinc-400 text-sm">Golden Match Football</li>
                        <li className="text-zinc-400 text-sm">Music Fest 2028</li>
                        <li className="text-zinc-400 text-sm">Tech Conference 2027</li>
                    </ul>
                </div>
            </div>
        </PageContainer>
    )
}

export default Dashboard