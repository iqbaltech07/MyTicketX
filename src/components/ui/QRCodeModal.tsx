"use client";

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { QRCodeSVG } from "qrcode.react";

type QRCodeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    value: string;
    eventName: string;
    ticketType: string;
};

const QRCodeModal = ({
    isOpen,
    onClose,
    value,
    eventName,
    ticketType,
}: QRCodeModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="top-center"
            backdrop="blur"
        >
            <ModalContent className="bg-[#202027] border border-zinc-800 text-white">
                {(onCloseHandler) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 mx-6">
                            QR Code Tiket
                        </ModalHeader>
                        <ModalBody className="px-6 space-y-4 items-center flex flex-col">
                            <div className="p-4 bg-white rounded-lg">
                                <QRCodeSVG
                                    value={value}
                                    title={`QR Code for ${eventName} - ${ticketType}`}
                                    size={128}
                                    bgColor={"#ffffff"}
                                    fgColor={"#000000"}
                                    level={"L"}
                                    marginSize={-1}
                                />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg">{eventName}</p>
                                <p className="text-zinc-400">{ticketType}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                variant="solid"
                                onPress={onCloseHandler}
                                className="bg-[#5AE3A8] text-zinc-900"
                            >
                                Tutup
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default QRCodeModal;