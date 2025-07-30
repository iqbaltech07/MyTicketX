// src/components/admin/EventFormModal.tsx
"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem } from "@heroui/react";

const categories = [
    { label: "Musik", value: "musik" },
    { label: "Olahraga", value: "olahraga" },
    { label: "Seminar", value: "seminar" },
    { label: "Seni", value: "seni" },
]

type EventFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function EventFormModal({ isOpen, onClose, title }: EventFormModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur">
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 mx-6">{title}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nama Event"
                                placeholder="Masukkan nama event"
                                variant="bordered"
                            />
                            <Textarea
                                label="Deskripsi"
                                placeholder="Masukkan deskripsi singkat event"
                                variant="bordered"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Tanggal Event"
                                    placeholder="Pilih tanggal"
                                    type="date"
                                    variant="bordered"
                                />
                                <Select
                                    label="Kategori"
                                    placeholder="Pilih kategori"
                                    variant="bordered"
                                >
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} textValue={cat.value} className="text-black">
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <Input
                                label="Lokasi"
                                placeholder="Masukkan lokasi event"
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Batal
                            </Button>
                            <Button className="bg-[#5AE3A8] text-zinc-900" onPress={onClose}>
                                Simpan
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}