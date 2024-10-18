"use client"

import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import React from "react";

const trendingVideos = videosMockup;

interface MovieTopUIProps {
    title: string;
}

export default function MoviesTop({ title }: Readonly<MovieTopUIProps>): JSX.Element {
    return (
        <>
            <h3 className="text-2xl mb-6">{title}</h3>
            <div id="trendingMovies"
                className="flex snap-x snap-proximity overflow-x-auto scroll-smooth transition-all
              [&::-webkit-scrollbar]:h-1
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-black
              dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800">
                {
                    trendingVideos.map(function (item) {
                        return (
                            <div key={item.id} className="relative snap-center shrink-0 lg:w-1/4 w-full">
                                <div
                                    className="absolute text-black"
                                    style={{
                                        top: "-1rem",
                                        left: "1rem",
                                        zIndex: "15"
                                    }}
                                >
                                    <span style={{
                                        fontSize: "3rem",
                                        textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;",
                                    }}>#</span>
                                    <span style={{
                                        fontSize: "5rem",
                                        textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;",
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
                                            <div>{item.name}</div>
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
                        )
                    })
                }
            </div>
        </>
    );
}
