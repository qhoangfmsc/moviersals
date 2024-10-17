import register from "@/api/register";
import { Button, Card, Checkbox, Image, Input, Link } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function RegisterFlipCard() {
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
                            console.log("response", response);
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
        <Card className="hidden lg:flex relative h-[670px] w-[500px] bg-transparent">
            <div className="absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(-180deg)] border-0">
                {/* FRONT */}
                <div className="absolute w-full h-full [backface-visibility:hidden]">
                    <Image
                        alt="cardBackground"
                        className="object-cover z-0"
                        src="/cardBackground.png"
                        height="670"
                        width="500"
                    />
                </div>
                {/* BACK */}
                <div className="absolute w-full h-full bg-gray-900 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <form className="flex flex-col items-center" onSubmit={onSubmit}>
                        <Card className="p-4 lg:w-[500px]">
                            <div className="text-xl mt-8">Thông tin người dùng</div>
                            {errorUser && <div style={{ color: 'red' }}>{errorUser}</div>}
                            <Input size="lg" type="text" name="displayname" variant="underlined" label="Họ và tên" />
                            <Input size="lg" type="tel" name="phonenumber" variant="underlined" label="Số điện thoại" />
                            <Input size="lg" type="email" name="email" variant="underlined" label="Email" />
                            <div className="text-xl mt-8">Thông tin tài khoản</div>
                            {errorAccount && <div style={{ color: 'red' }}>{errorAccount}</div>}
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
                </div>
            </div>
        </Card>
    )
}