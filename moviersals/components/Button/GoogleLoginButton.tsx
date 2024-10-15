"use client"

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { FlatColorIconsGoogle } from "../icons";

interface GoogleLoginButtonUIProps {
    text: string;
    variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    size: "sm" | "md" | "lg" | undefined;
}

export default function GoogleLoginButton({
    text,
    variant,
    color,
    size
}: Readonly<GoogleLoginButtonUIProps>): JSX.Element {
    const loginWithGoogle = async () => {
        try {
            console.log("logged in");
            signIn("google", { callbackUrl: "/" })
        } catch (error) {
            console.error(error);
        } finally {
            console.error("loginWithGoogle");
        }

    };

    return (
        <Button onClick={loginWithGoogle} className="w-[350px]" variant={variant} color={color} size={size} startContent={<FlatColorIconsGoogle />}>
            {text}
        </Button>
    )
}