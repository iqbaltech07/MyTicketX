import React from "react";
import EventTabsEdit from "~/components/admin/EventTabsEdit";
import { prisma } from "~/libs/prisma";
import { notFound } from "next/navigation";
import PageContainer from "~/components/layouts/PageContainer";

async function getEventData(id: string) {
    const event = await prisma.event.findUnique({
        where: { id },
    });
    if (!event) notFound();
    return event;
}

async function getCategories() {
    return await prisma.category.findMany({ orderBy: { name: 'asc' } });
}

const EditEventPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const [eventData, categories] = await Promise.all([
        getEventData(id),
        getCategories(),
    ]);

    const formattedEventData = {
        id: eventData.id,
        name: eventData.name,
        description: eventData.description || "",
        date: eventData.date.toISOString(),
        categoryId: eventData.categoryId,
        location: eventData.location || "",
        thumb: eventData.thumb || "",
        organizer: eventData.organizer || "",
        isDraf: eventData.isDraf,
    };

    const formattedCategories = categories.map(cat => ({
        label: cat.name,
        value: cat.id
    }));

    return (
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
                Edit Event: <span className="text-[#5AE3A8]">{eventData.name}</span>
            </h1>

            <div className="w-full h-fit overflow-y-auto">
                <EventTabsEdit
                    eventData={formattedEventData}
                    categories={formattedCategories}
                />
            </div>
        </div>
    );
};

export default EditEventPage;