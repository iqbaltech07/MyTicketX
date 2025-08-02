import Image from 'next/image';
import Link from 'next/link';
import ChartDashboard from '~/components/admin/ChartDashboard';
import StatCard from '~/components/ui/StatCard';
import { getDashboardStats, getLatestEvents, getMonthlySalesData } from '~/libs/data';

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
    const stats = await getDashboardStats();
    const latestEvents = await getLatestEvents();
    const salesData = await getMonthlySalesData();

    return (
        <div className='pb-10'>
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

                    <div className="mt-4 space-y-4">
                        {latestEvents.length > 0 ? (
                            latestEvents.map(event => (
                                <Link
                                    href={`/admin/events/${event.id}`}
                                    key={event.id}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                                >
                                    <Image
                                        src={event.thumb || '/images/golden-match.jpg'}
                                        alt={event.name}
                                        width={64}
                                        height={40}
                                        className="rounded-md object-cover w-16 h-10 flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-semibold truncate">{event.name}</p>
                                        <p className="text-zinc-400 text-xs">
                                            Dibuat pada {new Date(event.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-zinc-500 text-sm italic">Belum ada event yang dibuat.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;