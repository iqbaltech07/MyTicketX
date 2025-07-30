"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";

type CategoryFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function CategoryFormModal({ isOpen, onClose, title }: CategoryFormModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" backdrop="blur">
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 mx-6">{title}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Nama Kategori"
                                placeholder="Masukkan nama kategori"
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