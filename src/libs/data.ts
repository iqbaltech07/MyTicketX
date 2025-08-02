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

    const soldTicketsResult = await prisma.orderItem.aggregate({
      where: { transaction: { status: "COMPLETED" } },
      _sum: { quantity: true },
    });
    const totalTicketsSold = soldTicketsResult._sum.quantity || 0;

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
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        status: "COMPLETED",
      },
      include: {
        orderItems: {
          select: {
            quantity: true,
          },
        },
      },
    });

    const salesByMonth: { [key: string]: number } = {};

    transactions.forEach((trx) => {
      const monthIndex = trx.createdAt.getMonth();
      const monthName = monthNames[monthIndex];
      const totalQuantityInTrx = trx.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      if (salesByMonth[monthName]) {
        salesByMonth[monthName] += totalQuantityInTrx;
      } else {
        salesByMonth[monthName] = totalQuantityInTrx;
      }
    });

    return monthNames.map((month) => ({
      name: month,
      "Tiket Terjual": salesByMonth[month] || 0,
    }));
  } catch (error) {
    console.error("Error fetching monthly sales data:", error);
    return monthNames.map((month) => ({ name: month, "Tiket Terjual": 0 }));
  }
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

export async function getActiveTicketsByUserId(userId: string) {
  try {
    const purchasedTickets = await prisma.purchasedTicket.findMany({
      where: {
        orderItem: {
          transaction: {
            userId: userId,
            status: "COMPLETED",
          },
        },
      },
      include: {
        orderItem: {
          include: {
            ticket: {
              include: {
                event: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return purchasedTickets;
  } catch (error) {
    console.error("Error fetching active tickets:", error);
    return [];
  }
}

export async function getPurchaseHistoryByUserId(userId: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            ticket: {
              include: {
                event: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return [];
  }
}

export async function getAllTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true, 
        orderItems: {
          include: {
            ticket: {
              include: {
                event: true, 
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    return [];
  }
}
