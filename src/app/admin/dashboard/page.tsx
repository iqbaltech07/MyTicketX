import PageContainer from '~/components/layouts/PageContainer'
import StatCard from '~/components/ui/StatCard'
import { getDashboardStats } from '~/libs/data'

const Dashboard = async () => {
    const stats = await getDashboardStats();

    return (
        <PageContainer className='h-dvh' withSidebar>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
                Ringkasan statistik dari aplikasi MyTicketX.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Total Pengguna" value={stats.totalUsers.toLocaleString('id-ID')} />
                <StatCard title="Total Acara" value={stats.totalEvents.toLocaleString('id-ID')} />
                <StatCard title="Tiket Terjual (Estimasi)" value={stats.totalTicketsSold.toLocaleString('id-ID')} />
            </div>

            <div className="mt-10">
                <div className="p-6 bg-zinc-800 rounded-lg">
                    <h3 className="text-lg font-semibold">Grafik Penjualan (Contoh)</h3>
                    <p className="mt-2 text-zinc-400">Komponen chart akan ditempatkan di sini.</p>
                </div>
            </div>
        </PageContainer>
    )
}

export default Dashboard
