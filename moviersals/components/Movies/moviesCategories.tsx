"use client"

import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardFooter, Image, Tab, Tabs } from "@nextui-org/react";
import React, { Key } from "react";

const trendingVideos = videosMockup;

export default function MoviesCategories() {
    // CATEGORIES TABS
    const [selected, setSelected] = React.useState("action");
    const handleSelectionChange = (key: Key) => {
        setSelected(String(key));
    };

    return (
        <>
            <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={handleSelectionChange}
                color="primary"
                variant="underlined"
                size="lg"
            >
                {
                    Object.values(categoriesSubtitles).map(function (category) {
                        return (
                            <Tab key={category.name} title={
                                <>
                                    <div className="hidden lg:flex items-center space-x-2">
                                        {category.icon}
                                        <span>{category.vietsub}</span>
                                    </div>
                                    <div className="flex lg:hidden items-center space-x-2">
                                        {category.icon}
                                    </div>
                                </>
                            } className="flex justify-center flex-wrap">
                                {
                                    trendingVideos.filter((video) =>
                                        video.categories.includes(category.name)
                                    ).map(function (item) {
                                        return (
                                            <div key={item.id}
                                                className="w-fit">
                                                <Card
                                                    isFooterBlurred
                                                    radius="lg"
                                                    className="border-none m-1 lg:m-8"
                                                >
                                                    <Image
                                                        alt={item.name}
                                                        className="object-cover"
                                                        height={150}
                                                        src={item.thumbnail}
                                                        width={400}
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
                                                        <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm">
                                                            Xem ngay
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </>
    );
}
