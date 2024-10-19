"use client"

import { AkarIconsInfo, LineMdPlayFilled } from "@/components/icons";
import { Button, Card, Image, Link } from "@nextui-org/react";
import React from "react";

export default function ValorantIntroduction(): JSX.Element {
    return (
        <div className="relative">
            <video className="blur-xl" width="100%" height="300" autoPlay loop muted preload="auto">
                <source src="/VALORANTChampions2021.mp4" type="video/mp4" />
            </video>
            <div className="flex lg:hidden absolute justify-center"
                style={{
                    bottom: "-5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}>
                <Button color="danger" size="sm" variant="shadow" className="w-full mb-2 text-tiny" startContent={<LineMdPlayFilled />} >
                    Xem ngay VALORANT trên Moviersals
                </Button>
            </div>
            <div className="hidden lg:flex absolute left-20 justify-between w-11/12 z-10"
                style={{
                    fontSize: "3rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}>
                <div className="content-center" style={{
                    textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                }}>
                    <h1
                    >Xem mọi lúc, <br /> trút phiền lo!</h1>
                </div>
                <div className="flex flex-col mx-10">
                    <Image alt="valorantLogo" src="/valorantLogo.png" width={200} className="mx-4 mb-10" />
                    <Button color="danger" variant="shadow" className="w-full mb-2" startContent={<LineMdPlayFilled />} as={Link} href="/detail/1">
                        Xem ngay trên Moviersals
                    </Button>
                    <Button variant="light" className="w-full" startContent={<AkarIconsInfo />} as={Link} href="/detail/1">
                        Chi tiết về VALORANT
                    </Button>
                </div>
            </div>
            <Card className="absolute" style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "10px 15px 25px 1px #000000",
            }}>
                <video width="100%" height="300" autoPlay loop muted preload="auto">
                    <source src="/VALORANTChampions2021.mp4" type="video/mp4" />
                </video>
            </Card>
        </div>
    );
}
