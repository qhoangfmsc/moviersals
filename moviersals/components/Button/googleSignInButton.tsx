"use client"

import { Button } from "@nextui-org/button";
import { FlatColorIconsGoogle } from "../icons";

interface GoogleLoginButtonUIProps {
    text: string;
    variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    size: "sm" | "md" | "lg" | undefined;
}

export default function GoogleSignInButton({
    text,
    variant,
    color,
    size
}: Readonly<GoogleLoginButtonUIProps>): JSX.Element {
    const loginWithGoogle = async () => {
        console.log("logged in");
    };

    return (
        <Button onClick={loginWithGoogle} className="w-[350px]" variant={variant} color={color} size={size} startContent={<FlatColorIconsGoogle />}>
            {text}
        </Button>
    )
}