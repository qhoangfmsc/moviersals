"use client";

import CheckPasswordRecovery from "@/app/api/account/checkpasswordrecovery";
import ConfirmPasswordRecovery from "@/app/api/account/confirmpasswordrecovery";
import { showResponseToast } from "@/lib/utils";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorAccount, setErrorAccount] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    async function checkPasswordToken() {
      if (passwordToken) {
        const res = await CheckPasswordRecovery(passwordToken);
        if (res.result == "error") setIsTokenValid(false);
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
      const confirmnewpassword = formData.get("confirmnewpassword")?.toString();

      if (newpassword == confirmnewpassword) {
        const response = await ConfirmPasswordRecovery(newpassword, passwordToken);
        if (response.result == "success") {
          setIsLoading(false);
          showResponseToast(response);
        } else {
          setIsLoading(false);
          showResponseToast(response);
        }
      } else {
        setIsLoading(false);
        setErrorAccount("Password không khớp nhau!");
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
        <form
          className="flex flex-col items-center"
          onSubmit={onSubmit}>
          <Card className="p-4 lg:w-[500px] bg-transparent shadow-none">
            {errorUser && <div style={{ color: "red" }}>{errorUser}</div>}
            {errorAccount && <div style={{ color: "red" }}>{errorAccount}</div>}
            <Input
              size="lg"
              type="text"
              name="newpassword"
              variant="underlined"
              label="New password"
            />
            <Input
              size="lg"
              type="text"
              name="confirmnewpassword"
              variant="underlined"
              label="Confirm new password"
            />
            <div>
              <Button
                size="lg"
                className="my-4 w-[350px]"
                type="submit"
                disabled={isLoading}
                variant="shadow"
                color="success">
                {isLoading ? "Loading..." : "Đổi mật khẩu"}
              </Button>
            </div>
          </Card>
        </form>
      </>
    ) : (
      <>
        <div className="flex flex-col items-center text-center h-screen">
          <div className=" text-2xl ">Token không hợp lệ hoặc hết hạn</div>
          <Button
            size="lg"
            className="my-4 w-[350px]"
            href="request"
            as={Link}
            type="button"
            variant="shadow"
            color="success">
            {"Request token mới"}
          </Button>
        </div>
      </>
    )
  ) : (
    <>
      <div className="text-center text-2xl h-screen">Checking token...</div>
    </>
  );
}
