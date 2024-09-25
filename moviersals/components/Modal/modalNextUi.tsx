import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { JSXElementConstructor, ReactElement } from "react";
import { Button } from "@nextui-org/button";
import { Loading } from "@/components/icons";
import confetti from 'canvas-confetti';

// Define the props interface
interface ModalNextUIProps {
    title: string;
    body: ReactElement<any, string | JSXElementConstructor<any>>;
    optionalButton: {
        activeButtonIcon: JSX.Element,
        activeButtonText: string,
        cancelButtonText: string,
        confirmButtonText: string,
    };
}

// Update the function to accept props
export default function ModalNextUI({ title, body, optionalButton }: Readonly<ModalNextUIProps>): JSX.Element {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleConfetti = () => {
        confetti(
            {
                shapes: ["circle", "square"],
                particleCount: 100,
                spread: 360,
                origin: {
                    x: Math.random(),
                    y: Math.random()
                },
                angle: 315,
                gravity: 1.5,
            });
    };
    return (
        <>
            <Button
                className="text-sm font-normal text-default-800 bg-danger w-full"
                startContent={optionalButton.activeButtonIcon || <Loading className="text-default-800" />}
                variant="flat"
                onPress={() => {
                    handleConfetti();
                    onOpen();
                }}
            >
                {optionalButton.activeButtonText || "Kích hoạt"}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                {body}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {optionalButton.cancelButtonText || "Hủy"}
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    {optionalButton.confirmButtonText || "Đồng ý"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
