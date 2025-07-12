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
