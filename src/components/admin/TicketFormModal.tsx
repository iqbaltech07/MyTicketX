"use client";

import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@heroui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TicketSchema } from "~/schemas/formSchemas";
import axiosInstance from "~/libs/axiosInstance";

type TicketFormInputs = z.infer<typeof TicketSchema>;

type Ticket = {
    id: string;
    type: string;
    price: number;
    quantity: number;
    qrCode?: string | null;
};

type TicketFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    eventId: string;
    ticketData: Ticket | null;
};

export default function TicketFormModal({
    isOpen,
    onClose,
    onSuccess,
    eventId,
    ticketData,
}: TicketFormModalProps) {
    const isEditMode = Boolean(ticketData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TicketFormInputs>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            type: "",
            price: 0,
            quantity: 0,
            qrCode: "",
            eventId: eventId,
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && ticketData) {
                reset({
                    type: ticketData.type,
                    price: ticketData.price,
                    quantity: ticketData.quantity,
                    qrCode: ticketData.qrCode || "",
                    eventId: eventId,
                });
            } else {
                reset({
                    type: "",
                    price: 0,
                    quantity: 0,
                    qrCode: "",
                    eventId: eventId,
                });
            }
        }
    }, [isOpen, isEditMode, ticketData, reset, eventId]);

    const onSubmit: SubmitHandler<TicketFormInputs> = async (data) => {
        try {
            if (isEditMode && ticketData) {
                await axiosInstance.put(`/tickets/${ticketData.id}`, data);
            } else {
                await axiosInstance.post(`/events/${eventId}/tickets`, data);
            }
            onSuccess();
        } catch (error) {
            console.error("Gagal menyimpan tiket:", error);
            alert("Terjadi kesalahan. Silakan coba lagi.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="top-center"
            backdrop="blur"
        >
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onCloseHandler) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1 mx-6">
                            {isEditMode ? "Edit Tipe Tiket" : "Tambah Tipe Tiket Baru"}
                        </ModalHeader>
                        <ModalBody className="px-6 space-y-4">
                            <Controller name="type" control={control} render={({ field }) => (<Input {...field} autoFocus label="Tipe Tiket" placeholder="Contoh: VIP, Regular" variant="bordered" isInvalid={!!errors.type} errorMessage={errors.type?.message} />)} />
                            
                            <Controller name="price" control={control} render={({ field }) => (
                                <Input
                                    label="Harga"
                                    placeholder="Masukkan harga tiket"
                                    type="number"
                                    startContent={<span className="text-zinc-400 text-sm">Rp</span>}
                                    variant="bordered"
                                    isInvalid={!!errors.price}
                                    errorMessage={errors.price?.message}
                                    value={field.value?.toString() ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            )} />
                            
                            <Controller name="quantity" control={control} render={({ field }) => (
                                <Input
                                    label="Kuantitas"
                                    placeholder="Jumlah tiket yang tersedia"
                                    type="number"
                                    variant="bordered"
                                    isInvalid={!!errors.quantity}
                                    errorMessage={errors.quantity?.message}
                                    value={field.value?.toString() ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            )} />

                            <Controller name="qrCode" control={control} render={({ field }) => (
                                <Input
                                    {...field}
                                    label="URL QR Code (Opsional)"
                                    placeholder="https://..."
                                    variant="bordered"
                                    isInvalid={!!errors.qrCode}
                                    errorMessage={errors.qrCode?.message}
                                    value={field.value ?? ""}
                                />
                            )} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onCloseHandler}>Batal</Button>
                            <Button type="submit" className="bg-[#5AE3A8] text-zinc-900" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan"}</Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}