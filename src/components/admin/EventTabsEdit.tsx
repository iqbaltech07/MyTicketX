"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Card,
    CardBody,
    Tab,
    Tabs,
    Input,
    Textarea,
    Select,
    SelectItem,
    DateInput,
    Switch,
    Skeleton,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import TicketTable from "~/components/admin/TicketTable";
import {
    getLocalTimeZone,
    now,
    parseAbsoluteToLocal,
    toZoned,
} from "@internationalized/date";
import TicketFormModal from "./TicketFormModal";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { EventSchema } from "~/schemas/formSchemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "~/libs/axiosInstance";
import Image from "next/image";

type EventFormInputs = z.infer<typeof EventSchema>;

type EventTabsEditProps = {
    eventData: {
        id: string;
        name: string;
        description: string;
        date: string;
        categoryId: string;
        location: string;
        thumb: string;
        organizer: string;
        isDraf: boolean;
    };
    categories: { label: string; value: string }[];
};

type Ticket = {
    id: string;
    type: string;
    price: number;
    quantity: number;
    qrCode?: string | null;
};

const EventTabsEdit = ({ eventData, categories }: EventTabsEditProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        watch,
    } = useForm<EventFormInputs>({
        resolver: zodResolver(EventSchema),
        defaultValues: { ...eventData },
    });

    const thumbUrl = watch("thumb");

    const fetchTickets = useCallback(async () => {
        setLoadingTickets(true);
        try {
            const response = await axiosInstance.get(`/events/${eventData.id}/tickets`);
            setTickets(response.data);
        } catch (error) {
            console.error("Gagal mengambil data tiket:", error);
        } finally {
            setLoadingTickets(false);
        }
    }, [eventData.id]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const onEventSubmit = async (data: EventFormInputs) => {
        try {
            await axiosInstance.put(`/events/${eventData.id}`, data);
            alert("Perubahan berhasil disimpan!");
            router.refresh();
        } catch (error) {
            console.error("Gagal memperbarui event:", error);
            alert("Gagal menyimpan perubahan. Silakan coba lagi.");
        }
    };

    const handleOpenModal = (ticket: Ticket | null = null) => {
        setEditingTicket(ticket); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTicket(null);
    };

    const handleTicketSuccess = () => {
        fetchTickets();
        handleCloseModal(); 
    };

    return (
        <>
            <Tabs
                aria-label="Event Management Tabs"
                classNames={{
                    tabList: "bg-zinc-800",
                    cursor: "bg-[#5AE3A8]",
                    tabContent: "group-data-[selected=true]:text-zinc-900 font-bold",
                }}
            >
                <Tab key="details" title="Detail Event">
                    <form onSubmit={handleSubmit(onEventSubmit)}>
                        <Card className="bg-[#202027] border border-zinc-800 mt-4">
                            <CardBody className="p-6 space-y-4">
                                <Controller name="name" control={control} render={({ field }) => (<Input {...field} label="Nama Event" variant="bordered" errorMessage={errors.name?.message} isInvalid={!!errors.name} />)} />
                                <Controller name="organizer" control={control} render={({ field }) => (<Input {...field} label="Penyelenggara" variant="bordered" errorMessage={errors.organizer?.message} isInvalid={!!errors.organizer} />)} />
                                <Controller name="thumb" control={control} render={({ field }) => (<Input {...field} label="URL Gambar Banner" variant="bordered" errorMessage={errors.thumb?.message} isInvalid={!!errors.thumb} />)} />
                                {thumbUrl && !errors.thumb && <Image src={thumbUrl} alt="Preview" width={400} height={200} className="rounded-lg object-cover" />}
                                <Controller name="description" control={control} render={({ field }) => (<Textarea {...field} label="Deskripsi" variant="bordered" errorMessage={errors.description?.message} isInvalid={!!errors.description} />)} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Controller name="date" control={control} render={({ field }) => (
                                        <DateInput label="Tanggal Event" variant="bordered" value={field.value ? parseAbsoluteToLocal(field.value) : null}
                                            onChange={(date) => {
                                                if (date) {
                                                    const zoned = toZoned(date, getLocalTimeZone());
                                                    field.onChange(zoned.toAbsoluteString());
                                                } else {
                                                    field.onChange("");
                                                }
                                            }} minValue={now(getLocalTimeZone())} granularity="minute" errorMessage={errors.date?.message} isInvalid={!!errors.date} />
                                    )} />
                                    <Controller name="categoryId" control={control} render={({ field }) => (
                                        <Select {...field} label="Kategori" selectedKeys={[field.value]} variant="bordered" classNames={{ value: "!text-white" }} errorMessage={errors.categoryId?.message} isInvalid={!!errors.categoryId}>
                                            {categories.map((cat) => (<SelectItem key={cat.value} textValue={cat.label} className="text-black">{cat.label}</SelectItem>))}
                                        </Select>
                                    )} />
                                </div>
                                <Controller name="location" control={control} render={({ field }) => (<Input {...field} label="Lokasi" variant="bordered" errorMessage={errors.location?.message} isInvalid={!!errors.location} />)} />
                                <Controller
                                    name="isDraf"
                                    control={control}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <Switch isSelected={value} onChange={onChange} {...rest}>
                                            Simpan sebagai Draft
                                        </Switch>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-[#5AE3A8] text-zinc-900 font-bold" disabled={isSubmitting || !isDirty}>
                                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </form>
                </Tab>

                <Tab key="tickets" title="Manajemen Tiket">
                    <Card className="bg-transparent mt-4">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Daftar Tiket</h2>
                                <Button onPress={() => handleOpenModal()} className="bg-[#5AE3A8] text-zinc-900">
                                    <FaPlus />
                                    Tambah Tipe Tiket
                                </Button>
                            </div>
                            {loadingTickets ? (
                                <div className="space-y-3">
                                    <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                                    <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                                </div>
                            ) : (
                                <TicketTable
                                    tickets={tickets}
                                    onEdit={handleOpenModal}
                                    onDeleteSuccess={handleTicketSuccess}
                                />
                            )}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>

            <TicketFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleTicketSuccess}
                eventId={eventData.id}
                ticketData={editingTicket}
            />
        </>
    );
};

export default EventTabsEdit;