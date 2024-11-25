import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { Button, Card, CardFooter, Image, Link, Tab, Tabs } from "@nextui-org/react";
import React, { Key } from "react";

// Video interface with dynamic keys
interface Video {
    id: number;
    name: string;
    publisher: string;
    categories: string;
    description: string;
    thumbnail: string;
    [key: string]: any; // Allows any additional dynamic properties
}

// Define the type for the props that the component will receive
interface MoviesCategoriesProps {
    dataVideos: Video[]; // An array of Video objects
}

export default function MoviesCategories({ dataVideos }: MoviesCategoriesProps) {
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
                            } className="flex justify-center flex-wrap p-2">
                                {
                                    dataVideos?.filter((video) =>
                                        video.categories.includes(category.name)
                                    ).length > 0 ?
                                        dataVideos?.filter((video) =>
                                            video.categories.includes(category.name)
                                        )?.map(function (item) {
                                            return (
                                                <div key={item.id} className="w-fit">
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
                                                                <div className="font-black">{item.name}</div>
                                                                <div className="text-tiny">
                                                                    {Array.isArray(item.categories) ? (
                                                                        item.categories.map((cat, index) => (
                                                                            <span key={index}>
                                                                                {categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}
                                                                                {index !== item.categories.length - 1 && ', '}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        JSON.parse(item.categories || "[]").length > 0 ? (
                                                                            JSON.parse(item.categories || "[]").map((cat: string, index: number) => (
                                                                                <span key={index}>
                                                                                    {categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}
                                                                                    {index !== JSON.parse(item.categories || "[]").length - 1 && ', '}
                                                                                </span>
                                                                            ))
                                                                        ) : (
                                                                            <h1>Chưa có bộ phim nào!</h1>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm" as={Link} href={`/detail/${item.movieid}`}>
                                                                Xem ngay
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                        : <h1 className="my-10 text-xl">Chưa có bộ phim nào!</h1>
                                }
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </>
    );
}
