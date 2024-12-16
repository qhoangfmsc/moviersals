"use client";

import CheckPasswordRecovery from "@/app/api/account/checkpasswordrecovery";
import ConfirmPasswordRecovery from "@/app/api/account/confirmpasswordrecovery";
import { showResponseToast } from "@/lib/utils";
import { Button, Card, Input, Link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function PasswordRecoveryForm() {
  const urlParams = useSearchParams();
  const router = useRouter();
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

    checkPasswordToken();
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
          setTimeout(() => {
            router.push("/login");
          }, 1000);
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
      <div className="my-2">
        <form
          className="flex flex-col items-center"
          onSubmit={onSubmit}>
          <Card className="p-4 lg:w-[500px] bg-transparent shadow-none">
            {errorUser && <div style={{ color: "red" }}>{errorUser}</div>}
            {errorAccount && <div style={{ color: "red" }}>{errorAccount}</div>}
            <Input
              size="lg"
              type="password"
              name="newpassword"
              variant="underlined"
              label="Mật khẩu mới"
            />
            <Input
              size="lg"
              type="password"
              name="confirmnewpassword"
              variant="underlined"
              label="Nhập lại mật khẩu mới"
            />
            <div className="flex justify-center">
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
      </div>
    ) : (
      <div className="h-screen flex flex-col items-center">
        <div className="my-auto">
          <div className="text-2xl">Token không hợp lệ hoặc hết hạn</div>
          <div className="w-fit flex ml-auto mr-auto mt-4">
            <Button
              size="lg"
              href="request"
              as={Link}
              type="button"
              variant="shadow"
              color="success">
              Yêu cầu token mới
            </Button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="h-screen flex flex-col items-center">
      <div className="my-auto">
        <div className="text-center text-2xl">Đang kiểm tra token, vui lòng đợi...</div>
      </div>
    </div>
  );
}
