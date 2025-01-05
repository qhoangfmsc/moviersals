"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useState } from "react";
import GoogleSignInButton from "@/components/Button/googleSignInButton";
import login from "@/app/api/account/login";
import { useRouter, useSearchParams } from "next/navigation";
import { showResponseToast } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      if (username && password) {
        const response = await login(username, password);
        setIsLoading(false);
        if (response.result == "success") {
          setIsLoading(false);
          let returnUrl = searchParams.get("next") || "/";
          router.push(returnUrl);
        } else {
          setIsLoading(false);
        }
        showResponseToast(response);
      } else {
        setIsLoading(false);
        setError("Vui lòng nhập đầy đủ thông tin!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setError(error.message);
      }
    }
  }

  return (
    <form
      className="flex flex-col my-8 items-center"
      onSubmit={onSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Input
        size="lg"
        className="max-w-[350px]"
        type="text"
        name="username"
        variant="underlined"
        label="Tên thẻ hội viên"
      />
      <Input
        size="lg"
        className="max-w-[350px]"
        type="password"
        name="password"
        variant="underlined"
        label="Mật khẩu"
      />
      <p className="mt-4 w-[350px] text-right">
        <span className=" dark:text-gray-100 font-bold">
          <Link href="/passwordrecovery/request">&nbsp;Quên mật khẩu?</Link>
        </span>
      </p>
      <Button
        size="lg"
        className="mt-8 mb-4 w-[350px]"
        type="submit"
        disabled={isLoading}
        variant="shadow"
        color="success">
        {isLoading ? "Loading..." : "Vào rạp phim"}
      </Button>
      {/* <GoogleSignInButton
        text="Tham gia bằng Google"
        variant="shadow"
        size="lg"
        color={undefined}
      /> */}
      <p className="mt-8">
        Chưa có tài khoản? -
        <span className=" dark:text-gray-100">
          <Link href="/register">&nbsp;Đăng ký ngay</Link>
        </span>
      </p>
    </form>
  );
}
