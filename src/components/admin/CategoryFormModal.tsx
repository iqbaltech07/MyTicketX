"use client";

import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "~/schemas/formSchemas";
import { z } from "zod";
import axiosInstance from "~/libs/axiosInstance";

type CategoryFormInputs = z.infer<typeof CategorySchema>;

type Category = {
    id: string;
    name: string;
};

type CategoryFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category: Category | null;
}

export default function CategoryFormModal({ isOpen, onClose, onSuccess, category }: CategoryFormModalProps) {
    const isEditMode = Boolean(category);

    const { control, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<CategoryFormInputs>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (isEditMode) {
            reset({ name: category?.name });
        } else {
            reset({ name: "" });
        }
    }, [category, isEditMode, reset]);

    const onSubmit = async (data: CategoryFormInputs) => {
        try {
            if (isEditMode) {
                await axiosInstance.put(`/categories/${category?.id}`, data);
            } else {
                await axiosInstance.post('/categories', data);
            }
            onSuccess();
        } catch (error: any) {
            if (error.response?.status === 409) {
                setError("name", {
                    type: "manual",
                    message: error.response.data.message,
                });
            } else {
                console.error("Gagal menyimpan kategori:", error);
                alert("Gagal menyimpan kategori. Silakan coba lagi.");
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur">
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1 mx-6">{isEditMode ? "Edit Kategori" : "Tambah Kategori Baru"}</ModalHeader>
                        <ModalBody>
                             <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        autoFocus
                                        label="Nama Kategori"
                                        placeholder="Masukkan nama kategori"
                                        variant="bordered"
                                        errorMessage={errors.name?.message}
                                        isInvalid={!!errors.name}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Batal
                            </Button>
                            <Button type="submit" className="bg-[#5AE3A8] text-zinc-900" disabled={isSubmitting}>
                                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}