"use client";

import CheckPasswordRecovery from "@/api/account/checkpasswordrecovery";
import ConfirmPasswordRecovery from "@/api/account/confirmpasswordrecovery";
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
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function PasswordRecoveryForm() {
  const urlParams = useSearchParams();
  const passwordToken = urlParams.get("token");
  const [isTokenValid, setIsTokenValid] = useState<boolean>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isCheckDone, setIsCheckingDone] = useState<boolean>(false);
  const [errorAccount, setErrorAccount] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    async function checkPasswordToken() {
      if (passwordToken) {
        const res = await CheckPasswordRecovery(passwordToken);
        if (res.result == "fail") setIsTokenValid(false);
        else setIsTokenValid(true);
      }
    }

    return () => {
      checkPasswordToken();
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorUser(null);
    setErrorAccount(null);

    try {
      const formData = new FormData(event.currentTarget);
      const newpassword = formData.get("newpassword")?.toString();

      if (newpassword) {
        const response = await ConfirmPasswordRecovery(newpassword, passwordToken);
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
        setErrorAccount("Vui lòng nhập password mới!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setErrorAccount(error.message);
      }
    }
  }

  return isTokenValid != null ? (
    isTokenValid ? (
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
    ) : (
      <>
        <div>Token không hợp lệ</div>
      </>
    )
  ) : (
    <>
      <div>Loading</div>
    </>
  );
}
