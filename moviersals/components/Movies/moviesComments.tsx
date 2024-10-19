"use client"

import { videosMockup } from "@/config/videosMockup";
import { Avatar, Card, Divider } from "@nextui-org/react";

const trendingVideos = videosMockup;

export default function MoviesComments({
    movieid
}: {
    movieid: string
}) {
    return (
        <>
            {trendingVideos.map((item, index) => (
                <div key={item.id}>
                    <div className="mb-4">
                        <div className="flex flex-row my-4 mx-2">
                            <Avatar isBordered className="w-10 h-10 mr-1" src={item.thumbnail} />
                            <div className="flex flex-col mx-4 self-center">
                                <p>{item.name} <span className="text-tiny text-gray-500 ml-2">{item.id} giờ trước</span></p>
                                <p className="text-tiny">@{item.publisher}</p>
                            </div>
                        </div>
                        <Card className="text-sm p-3 w-fit text-gray-400">{item.description}</Card>
                    </div>
                    <Divider orientation="horizontal" />
                </div>
            ))}
        </>
    );
}