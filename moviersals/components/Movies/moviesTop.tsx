"use client"

import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import React from "react";

const trendingVideos = videosMockup;

interface MovieTopUIProps {
    title: string;
}

export default function MoviesTop({ title }: Readonly<MovieTopUIProps>): JSX.Element {
    const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

    return (
        <>
            <h3 className="text-2xl mb-6">{title}</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {
                        trendingVideos.map(function (item) {
                            return (
                                <div className="embla__slide" key={item.id}>
                                    <div key={item.id} className="relative snap-center shrink-0 lg:w-1/4 w-full">
                                        <div
                                            className="absolute text-black"
                                            style={{
                                                top: "-2rem",
                                                left: "0rem",
                                                zIndex: "15"
                                            }}
                                        >
                                            <span style={{
                                                fontSize: "3rem",
                                                textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff"
                                            }}>#</span>
                                            <span style={{
                                                fontSize: "5rem",
                                                textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff"
                                            }}>{item.id}</span>
                                        </div>
                                        <Card
                                            isFooterBlurred
                                            radius="lg"
                                            className="border-none m-2 lg:mx-8"
                                        >
                                            <Image
                                                alt={item.name}
                                                className="object-cover"
                                                height={500}
                                                src={item.thumbnail}
                                                width={500}
                                            />
                                            <CardFooter className="justify-between">
                                                <div className="text-white/80">
                                                    <div className="font-black">{item.name}</div>
                                                    <div className="text-tiny">
                                                        {item.categories.map((cat, index) => (
                                                            <span key={index}>
                                                                {categoriesSubtitles[cat as keyof typeof categoriesSubtitles].vietsub}
                                                                {index !== item.categories.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm" as={Link} href={`/detail/${item.id}`}>
                                                    Xem ngay
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}
