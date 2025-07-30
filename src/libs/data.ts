import { prisma } from "./prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
}

export async function getDashboardStats() {
  try {
    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });
    const totalEvents = await prisma.event.count();
    const totalTickets = await prisma.ticket.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return {
      totalUsers,
      totalEvents,
      totalTicketsSold: totalTickets._sum.quantity || 0
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Error fetching dashboard stats");
  }
}

export async function getMonthlySalesData() {
  // NOTE: Ketika model Transaction sudah ada, ganti dummy data ini
  // dengan query Prisma untuk agregasi data penjualan per bulan.
  return [
    { name: 'Jan', "Tiket Terjual": 1200 },
    { name: 'Feb', "Tiket Terjual": 2100 },
    { name: 'Mar', "Tiket Terjual": 1800 },
    { name: 'Apr', "Tiket Terjual": 2780 },
    { name: 'Mei', "Tiket Terjual": 1890 },
    { name: 'Jun', "Tiket Terjual": 2390 },
    { name: 'Jul', "Tiket Terjual": 3490 },
  ];
}