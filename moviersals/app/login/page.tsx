"use client"

import GoogleLoginButton from "@/components/Button/GoogleLoginButton";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      console.error(formData);
      // const response = await fetch('/api/submit', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to submit the data. Please try again.')
      // }

      // const data = await response.json();

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className={title()}>Chào mừng đến với <b>Moviersals</b></h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form className="flex flex-col my-8 items-center" onSubmit={onSubmit}>
        <Input size="lg" className="max-w-[350px]" type="text" name="username" variant="underlined" label="Tài khoản" />
        <Input size="lg" className="max-w-[350px]" type="password" name="password" variant="underlined" label="Mật khẩu" />
        <Button size="lg" className="mt-12 w-[350px]" type="submit" disabled={isLoading} variant="shadow" color="success">
          {isLoading ? 'Loading...' : 'Vào rạp phim'}
        </Button>
        <h1 className="my-4 text-neutral-500">hoặc</h1>
        <GoogleLoginButton text="Tham gia bằng Google" variant="shadow" size="lg" color={undefined} />
      </form>
    </div>
  );
}
