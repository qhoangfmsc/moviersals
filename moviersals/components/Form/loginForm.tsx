"use client"

import GoogleLoginButton from "@/components/Button/googleLoginButton";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget)
            console.log(formData);
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
        <form className="flex flex-col my-8 items-center" onSubmit={onSubmit}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Input size="lg" className="max-w-[350px]" type="text" name="username" variant="underlined" label="Tài khoản" />
            <Input size="lg" className="max-w-[350px]" type="password" name="password" variant="underlined" label="Mật khẩu" />
            <Button size="lg" className="mt-8 mb-4 w-[350px]" type="submit" disabled={isLoading} variant="shadow" color="success">
                {isLoading ? 'Loading...' : 'Vào rạp phim'}
            </Button>
            <GoogleLoginButton text="Tham gia bằng Google" variant="shadow" size="lg" color={undefined} />
            <p className="mt-8">Chưa có tài khoản? -
                <span className="text-gray-100"><Link href="/register">&nbsp;Đăng ký ngay</Link></span>
            </p>
        </form>
    );
}
