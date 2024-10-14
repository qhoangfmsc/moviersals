"use client"

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
      <form onSubmit={onSubmit}>
        <Input type="text" name="username" variant="underlined" label="Tài khoản" />
        <Input type="password" name="password" variant="underlined" label="Mật khẩu" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Vào rạp phim'}
        </Button>
      </form>
    </div>
  );
}
