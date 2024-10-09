"use client"

import { AkarIconsInfo, LineMdPlayFilled } from "@/components/icons";
import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardBody, CardFooter, Image, Tab, Tabs } from "@nextui-org/react";
import React, { Key, useEffect, useRef } from "react";

const trendingVideos = videosMockup;

export default function Home() {
  // CATEGORIES TABS
  const [selected, setSelected] = React.useState("action");
  const handleSelectionChange = (key: Key) => {
    setSelected(String(key));
  };

  return (
    <>
      <div className="relative">
        <video className="blur-xl" width="100%" height="300" autoPlay loop muted preload="auto">
          <source src="/VALORANTChampions2021.mp4" type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
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
        <div className="hidden lg:flex absolute top-80 left-20  justify-between w-11/12 "
          style={{
            fontSize: "3rem",
            textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;"
          }}>
          <div className="content-center">
            <h1
            >Xem mọi lúc, <br /> trút phiền lo!</h1>
          </div>
          <div className="flex flex-col mx-10">
            <Image alt="valorantLogo" src="/valorantLogo.png" width={200} className="mx-4 mb-10" />
            <Button color="danger" variant="shadow" className="w-full mb-2" startContent={<LineMdPlayFilled />} >
              Xem ngay trên Moviersals
            </Button>
            <Button variant="light" className="w-full" startContent={<AkarIconsInfo />}>
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
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
          </video>
        </Card>
      </div>
      <div className="w-full my-14 p-6 lg:p-16">
        <h3 className="text-2xl mb-6">10 bộ phim thịnh hành nhất hiện nay</h3>
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
                      <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm">
                        Xem ngay
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )
            })
          }
        </div>
        <div className="flex w-full flex-col items-center my-14">
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
        </div>
      </div>
    </>
  );
}
