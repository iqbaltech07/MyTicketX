"use client";

import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
    DateInput,
    Image
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "~/schemas/formSchemas";
import { z } from "zod";
import axiosInstance from "~/libs/axiosInstance";
import { parseAbsoluteToLocal, now, getLocalTimeZone, toZoned } from "@internationalized/date";

type EventFormInputs = z.infer<typeof EventSchema>;

type Category = {
    id: string;
    name: string;
};

type EventFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSuccess: () => void;
};

export default function EventFormModal({
    isOpen,
    onClose,
    title,
    onSuccess,
}: EventFormModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<EventFormInputs>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            name: "",
            description: "",
            thumb: "",
            date: "",
            location: "",
            organizer: "",
            categoryId: "",
        },
    });

    const thumbUrl = watch("thumb");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get("/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            }
        };

        if (isOpen) {
            fetchCategories();
        } else {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: EventFormInputs) => {
        try {
            await axiosInstance.post("/events", data);
            reset();
            onSuccess();
        } catch (error) {
            console.error("Gagal membuat event:", error);
            alert("Gagal menyimpan event. Silakan coba lagi.");
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur">
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1 mx-6">{title}</ModalHeader>
                        <ModalBody>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} label="Nama Event" placeholder="Masukkan nama event" variant="bordered" errorMessage={errors.name?.message} isInvalid={!!errors.name} />
                                )}
                            />

                            <Controller
                                name="thumb"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} label="URL Gambar Banner" placeholder="https://..." variant="bordered" errorMessage={errors.thumb?.message} isInvalid={!!errors.thumb} />
                                )}
                            />
                            {thumbUrl && !errors.thumb && (
                                <Image
                                    src={thumbUrl}
                                    alt="Preview banner"
                                    width={400}
                                    height={200}
                                    className="rounded-lg object-cover w-full"
                                />
                            )}

                            <Controller
                                name="organizer"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} label="Penyelenggara (Opsional)" placeholder="Masukkan nama penyelenggara" variant="bordered" errorMessage={errors.organizer?.message} isInvalid={!!errors.organizer} />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea {...field} label="Deskripsi" placeholder="Masukkan deskripsi event" variant="bordered" errorMessage={errors.description?.message} isInvalid={!!errors.description} />
                                )}
                            />
                            <div className="grid grid-cols-2 gap-8">
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <DateInput
                                            {...field}
                                            label="Tanggal & Waktu Event"
                                            variant="bordered"
                                            value={field.value ? parseAbsoluteToLocal(field.value) : null}
                                            onChange={(date) => {
                                                if (date) {
                                                    const zoned = toZoned(date, getLocalTimeZone());
                                                    field.onChange(zoned.toAbsoluteString());
                                                } else {
                                                    field.onChange("");
                                                }
                                            }}
                                            minValue={now(getLocalTimeZone())}
                                            granularity="minute"
                                            errorMessage={errors.date?.message}
                                            isInvalid={!!errors.date}
                                        />
                                    )}
                                />
                                <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} label="Kategori" placeholder="Pilih kategori" variant="bordered" errorMessage={errors.categoryId?.message} isInvalid={!!errors.categoryId} classNames={{ value: "!text-white" }}>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} textValue={cat.name} className="text-black">
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} label="Lokasi" placeholder="Masukkan lokasi event" variant="bordered" errorMessage={errors.location?.message} isInvalid={!!errors.location} />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>Batal</Button>
                            <Button type="submit" className="bg-[#5AE3A8] text-zinc-900" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}