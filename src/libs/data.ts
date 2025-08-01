import { prisma } from "./prisma";

export async function getDashboardStats() {
  try {
    const totalUsers = await prisma.user.count({
      where: { role: "USER" },
    });

    const totalEvents = await prisma.event.count({
      where: { isDraf: false },
    });

    const totalTickets = await prisma.ticket.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const totalTicketsSold = 0;

    return {
      totalUsers,
      totalEvents,
      totalTickets: totalTickets._sum.quantity || 0,
      totalTicketsSold,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalUsers: 0,
      totalEvents: 0,
      totalTickets: 0,
      totalTicketsSold: 0,
    };
  }
}

export async function getLatestEvents() {
  try {
    const events = await prisma.event.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching latest events:", error);
    return [];
  }
}

export async function getMonthlySalesData() {
  return [
    { name: "Jan", "Tiket Terjual": 1200 },
    { name: "Feb", "Tiket Terjual": 2100 },
    { name: "Mar", "Tiket Terjual": 1800 },
    { name: "Apr", "Tiket Terjual": 2780 },
    { name: "Mei", "Tiket Terjual": 1890 },
    { name: "Jun", "Tiket Terjual": 2390 },
    { name: "Jul", "Tiket Terjual": 3490 },
  ];
}

export async function getPublicLatestEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { isDraf: false },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching public latest events:", error);
    return [];
  }
}

export async function getPublicUpcomingEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        isDraf: false,
        date: {
          gte: new Date(),
        },
      },
      take: 10,
      orderBy: {
        date: "asc",
      },
      include: {
        category: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching public upcoming events:", error);
    return [];
  }
}

export async function getPublicCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching public categories:", error);
    return [];
  }
}

export async function getPublicAllEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { isDraf: false },
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching all public events:", error);
    return [];
  }
}

export async function getEventById(slug: string) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        slug: slug,
        isDraf: false,
      },
      include: {
        tickets: {
          orderBy: {
            price: "asc",
          },
        },
        category: true,
      },
    });
    return event;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
}
