"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import { FaCalendar, FaMapPin, FaQrcode } from "react-icons/fa";
import QRCodeModal from "./QRCodeModal";

const TicketCard = ({
    id,
    event,
    qrCode,
    ticketType,
}: {
    id: string;
    event: any;
    qrCode: string;
    ticketType: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventDate = new Date(event.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="bg-[#202027] border border-zinc-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div
                    className="md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-semibold text-[#5AE3A8]">{ticketType}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{event.name}</h3>
                        <div className="mt-3 space-y-2 text-zinc-300">
                            <p className="flex items-center gap-2">
                                <FaCalendar /> {eventDate}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapPin /> {event.location}
                            </p>
                        </div>


                    </div>
                    <div className="flex w-full justify-between items-center mt-4">
                        <small className="text-small font-semibold text-zinc-300">Ticket ID : {id}</small>
                        <Button
                            className=" w-full md:w-auto md:self-end bg-white hover:bg-white"
                            onPress={handleOpenModal}
                        >
                            <FaQrcode className="mr-2" />
                            Lihat QR Code
                        </Button>
                    </div>
                </div>
            </div>
            <QRCodeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                value={qrCode}
                eventName={event.name}
                ticketType={ticketType}
            />
        </>
    );
};
export default TicketCard;