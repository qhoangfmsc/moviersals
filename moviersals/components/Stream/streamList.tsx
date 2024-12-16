"use client";

import { Button, Card, Tooltip } from "@nextui-org/react";
import React from "react";
import { MdiEyeOutline } from "../icons";
import { calculateTimeDifference } from "@/lib/utils";
import Image from "next/image";

const streamList = [
  {
    id: 1,
    name: "Livestream",
    creator: "Moviersals",
    views: 489,
    description: "Giải đấu Valorant trực tuyến VCT Pacific Mùa giải Split 2 Năm 2024",
    createddate: "2024/11/11 23:57:00",
    isstreaming: true,
    thumbnail: null,
  },
  {
    id: 2,
    name: "Lightshop",
    creator: "Moviersals",
    views: 245,
    description:
      "Nội dung phim Light Shop Full tập xoay quanh một cửa hàng ánh sáng huyền bí, nơi những người đến tìm kiếm ánh sáng kỳ diệu sẽ đối mặt với những quyết định khó khăn giữa tình yêu, số phận và những lực lượng siêu nhiên.",
    createddate: "2024/11/20 20:57:00",
    isstreaming: false,
    thumbnail: "/image/lightshop-thumbnail.jpg",
  },
  {
    id: 3,
    name: "Death's Game",
    creator: "Moviersals",
    views: 2032,
    description:
      "Death’s game là một trong những bộ phim Hàn Quốc thu hút nhiều người xem vào cuối năm 2023 nay. Có rất nhiều điều về bộ phim khiến cho người xem ấn tượng dù chỉ mới chiếu vài tập đầu tiên như diễn xuất, nội dung và đặc biệt là dàn diễn viên tham gia.",
    createddate: "2023/09/13 12:30:30",
    isstreaming: false,
    thumbnail: "/image/deathgame-thumbnail.jpg",
  },
];

export default function StreamList(): JSX.Element {
  return (
    <>
      {streamList.map((item) => (
        <Tooltip
          content="Chức năng sẽ ra mắt trong thời gian tới. Cảm ơn quý khách đã quan tâm!"
          showArrow={true}
          key={item.id}
          size="lg">
          <Card
            className="lg:w-1/2 m-4"
            key={item.id}>
            <div className="lg:flex flex-row p-2 lg:p-6 lg:gap-6">
              <Image
                priority
                unoptimized
                src={item.thumbnail ?? "/image/streaming-thumbnail.gif"}
                alt="background"
                width={450}
                height={100}
              />
              <div className="basis-2/5">
                {item.isstreaming ? (
                  <Button
                    variant="solid"
                    color="danger"
                    className="uppercase w-full lg:w-fit px-8"
                    disabled
                    size="sm">
                    {"Đang diễn ra"}
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    color="default"
                    className="uppercase w-full lg:w-fit px-8"
                    disabled
                    size="sm">{`${calculateTimeDifference(item.createddate).value} ${calculateTimeDifference(item.createddate).type} trước`}</Button>
                )}
                <div className="my-4">
                  <h1 className="text-xl lg:text-3xl font-black">{item.name}</h1>
                  <h1 className="text-sm text-gray-400">@{item.creator}</h1>
                  <div className="flex text-tiny text-gray-300 font-black">
                    <div className="self-center">
                      <MdiEyeOutline />
                    </div>
                    <div className="self-center">&nbsp; {item.views} lượt xem</div>
                  </div>
                  <p className="my-4 text-tiny text-gray-400 hidden lg:block">{item.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </Tooltip>
      ))}
    </>
  );
}
