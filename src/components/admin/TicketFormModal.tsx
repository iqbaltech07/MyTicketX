"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";

type TicketFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function TicketFormModal({ isOpen, onClose, title }: TicketFormModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur">
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 mx-6">{title}</ModalHeader>
                        <ModalBody>
                            <Input autoFocus label="Tipe Tiket" placeholder="Contoh: VIP, Regular, dll" variant="bordered"/>
                            <Input label="Harga" placeholder="Masukkan harga tiket" type="number" startContent={<span className="text-zinc-400 text-sm">Rp</span>} variant="bordered"/>
                            <Input label="Kuantitas" placeholder="Jumlah tiket yang tersedia" type="number" variant="bordered"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>Batal</Button>
                            <Button className="bg-[#5AE3A8] text-zinc-900" onPress={onClose}>Simpan</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}