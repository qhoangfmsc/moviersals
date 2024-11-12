"use client"

import { Button } from "@nextui-org/react";
import React from "react";
import StreamList from "./streamList";

interface StreamIntroductionUIProps {
    title: JSX.Element;
    subtitle: JSX.Element;
}

export default function StreamIntroduction({ title, subtitle }: Readonly<StreamIntroductionUIProps>): JSX.Element {
    return (
        <>
            <div className="flex flex-row justify-center mb-12">
                <Button variant="bordered" color="danger" className="uppercase w-fit self-center mr-2 hidden lg:block" size="sm" disabled>{subtitle}</Button>
                <h3 className="lg:text-4xl text-center">{title}</h3>
            </div>
            <div className="justify-items-center">
                <StreamList />
            </div>
        </>
    );
}
