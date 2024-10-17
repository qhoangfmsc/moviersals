"use client"

import register from "@/api/register";
import { Button, Card, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorAccount, setErrorAccount] = useState<string | null>(null)
    const [errorUser, setErrorUser] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setErrorUser(null)
        setErrorAccount(null)

        try {
            const formData = new FormData(event.currentTarget)
            // USER
            const displayname = formData.get("displayname")?.toString();
            const email = formData.get("email")?.toString();
            const phonenumber = formData.get("phonenumber")?.toString();
            // ACCOUNT
            const username = formData.get("username")?.toString();
            const password = formData.get("password")?.toString();
            const repassword = formData.get("repassword")?.toString();

            if (displayname && email && phonenumber) {
                if (username && password) {
                    setIsLoading(false);
                    if (password == repassword) {
                        if (isSelected) {
                            const response = await register(username, password, displayname, email, phonenumber);
                            if (response.result == "success") {
                                onOpen();
                            } else {
                                setErrorAccount(response.content);
                            }
                        } else {
                            setErrorAccount("Vui lòng chấp nhận điều khoản trước khi đăng ký!");
                        }
                    } else {
                        setErrorAccount("Mật khẩu không trùng khớp!");
                    }
                } else {
                    setIsLoading(false);
                    setErrorAccount("Vui lòng nhập đầy đủ thông tin tài khoản!");
                }
            } else {
                setIsLoading(false);
                setErrorUser("Vui lòng nhập đầy đủ thông tin người dùng!");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setIsLoading(false)
                setErrorAccount(error.message)
            }
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Thông báo</ModalHeader>
                            <ModalBody>
                                <p>Đăng ký thẻ hội viên thành công! Chuyển đến trang đăng nhập?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" as={Link} href="/login">
                                    Đồng ý
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <form className="lg:hidden flex flex-col items-center" onSubmit={onSubmit}>
                <Card className="p-4 lg:w-[500px] bg-transparent shadow-none">
                    {errorAccount && <div style={{ color: 'red' }}>{errorAccount}</div>}
                    {errorUser && <div style={{ color: 'red' }}>{errorUser}</div>}
                    <Input size="lg" type="text" name="displayname" variant="underlined" label="Họ và tên" />
                    <Input size="lg" type="tel" name="phonenumber" variant="underlined" label="Số điện thoại" />
                    <Input size="lg" type="email" name="email" variant="underlined" label="Email" />
                    <Input size="lg" type="text" name="username" variant="underlined" label="Tên thẻ hội viên" />
                    <Input size="lg" type="password" name="password" variant="underlined" label="Mật khẩu" />
                    <Input size="lg" type="password" name="repassword" variant="underlined" label="Nhập lại mật khẩu" />
                    <Checkbox className="my-2" isSelected={isSelected} onValueChange={setIsSelected}>
                        Tôi đồng ý với <Link href="/about" target="__blank">Hợp đồng và Chính sách</Link> của Moviersals
                    </Checkbox>
                    <div>
                        <Button size="lg" className="my-4 w-[350px]" type="submit" disabled={isLoading} variant="shadow" color="success">
                            {isLoading ? 'Loading...' : 'Tham gia hội viên'}
                        </Button>
                    </div>
                </Card>
            </form>
        </>
    );
}
