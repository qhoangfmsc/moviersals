"use client"

import { Button, Card, Image, Link } from "@nextui-org/react";
import React from "react";
import { MdiEyeOutline } from "../icons";
import { calculateTimeDifference } from "@/lib/utils";

const streamList = [
    {
        id: 1,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2024/11/11 23:57:00",
        isstreaming: true,
    },
    {
        id: 2,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2024/11/11 20:57:00",
        isstreaming: false,
    },
    {
        id: 3,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2024/11/09 12:30:30",
        isstreaming: false,
    },
    {
        id: 4,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2024/11/01 12:30:30",
        isstreaming: false,
    },
    {
        id: 5,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2024/01/02 12:30:30",
        isstreaming: false,
    },
    {
        id: 6,
        name: "Livestream",
        creator: "qhoangf",
        views: 3,
        description: "Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.",
        createddate: "2022/01/02 12:30:30",
        isstreaming: false,
    },
]

export default function StreamList(): JSX.Element {
    return (
        <>
            {streamList.map((item) => (
                <Card className="w-1/2 m-4" key={item.id} as={Link} href={`/stream/${item.id}`}>
                    <div className="flex flex-row p-6 gap-6">
                        <Image src="/streaming-thumbnail.gif" alt="background" />
                        <div className="basis-2/5">
                            {
                                item.isstreaming
                                    ?
                                    <Button variant="solid" color="danger" className="uppercase w-fit px-8" disabled size="sm">{
                                        "Đang diễn ra"
                                    }</Button>
                                    :
                                    <Button variant="solid" color="default" className="uppercase w-fit px-8" disabled size="sm">{
                                        `${calculateTimeDifference(item.createddate).value} ${calculateTimeDifference(item.createddate).type} trước`
                                    }</Button>
                            }
                            <div className="my-4">
                                <h1 className="text-4xl font-black">{item.name}</h1>
                                <h1 className="text-sm text-gray-400">@{item.creator}</h1>
                                <div className="flex text-tiny text-gray-300 font-black">
                                    <div className="self-center">
                                        <MdiEyeOutline />
                                    </div>
                                    <div className="self-center">
                                        &nbsp; {item.views} lượt xem
                                    </div>
                                </div>
                                <p className="my-4 text-tiny text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </>
    );
}
