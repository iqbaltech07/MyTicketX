import React from "react";
import EventTabsEdit from "~/components/admin/EventTabsEdit";

const categories = [
    { label: "Olahraga", value: "olahraga" },
    { label: "Musik", value: "musik" },
];
const eventData = {
    name: "Golden Match Football",
    description: "Pertandingan sepak bola terakbar tahun ini!",
    date: "2028-03-01",
    categoryId: "olahraga",
    location: "Stadion Gelora Bung Karno"
}

const EditEventPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-4">
                Edit Event: <span className="text-[#5AE3A8]">{eventData.name}</span>
            </h1>

            <div className="w-full">
                <EventTabsEdit eventData={eventData} categories={categories} />
            </div>
        </div>
    );
};

export default EditEventPage;