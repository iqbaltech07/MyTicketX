"use server";

import { prisma } from "~/libs/prisma";

export async function searchEventsByName(query: string) {
  if (!query) {
    return [];
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        isDraf: false, 
      },
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        thumb: true,
      },
    });
    return events;
  } catch (error) {
    console.error("Search event action error:", error);
    return [];
  }
}