"use client";

import RequestPasswordRecovery from "@/app/api/account/requestpasswordrecovery";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function RequestPasswordRecoveryForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorAccount, setErrorAccount] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorUser(null);
    setErrorAccount(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email")?.toString();

      if (email) {
        const response = await RequestPasswordRecovery(email);
        if (response.result == "success") {
          setIsLoading(false);
          setRequestMessage(response.content);
          onOpen();
        } else {
          setIsLoading(false);
          setErrorAccount(response.content);
        }
      } else {
        setIsLoading(false);
        setErrorAccount("Vui lòng điền email!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setErrorAccount(error.message);
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Thông báo</ModalHeader>
              <ModalBody>
                <p>{requestMessage}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  as={Link}
                  href="/login"
                  onPress={onClose}>
                  Đồng ý
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <form
        className="flex flex-col items-center"
        onSubmit={onSubmit}>
        <Card className="p-4 lg:w-[500px] bg-transparent shadow-none">
          {errorAccount && <div style={{ color: "red" }}>{errorAccount}</div>}
          {errorUser && <div style={{ color: "red" }}>{errorUser}</div>}
          <Input
            size="lg"
            type="email"
            name="email"
            variant="underlined"
            label="Email"
          />
          <div>
            <Button
              size="lg"
              className="my-4 w-[350px]"
              type="submit"
              disabled={isLoading}
              variant="shadow"
              color="success">
              {isLoading ? "Loading..." : "Gửi yêu cầu tới email"}
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}
