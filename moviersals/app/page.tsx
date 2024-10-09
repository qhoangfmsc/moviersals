"use client"

import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";

const trendingVideos = videosMockup;

export default function Home() {
  return (
    <>
      <video width="100%" height="300" autoPlay loop muted preload="auto">
        <source src="/VALORANTChampions2021.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </video>
      <div className="w-full p-6 lg:p-16">
        <h3 className="text-2xl mb-6">Bảng xếp hạng thịnh hành</h3>
        <div className="flex snap-x snap-proximity overflow-x-auto scroll-smooth
              [&::-webkit-scrollbar]:h-1
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-neutral-900
              dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
          {
            trendingVideos.map(function (item) {
              return (
                <div key={item.id} className="relative snap-center shrink-0 lg:w-1/4 w-full">
                  <div
                    className="absolute text-black"
                    style={{
                      top: "-0.5rem",
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
                    className="border-none lg:m-8"
                  >
                    <Image
                      alt={item.name}
                      className="object-cover"
                      height={500}
                      src={item.thumbnail}
                      width={400}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 
                      overflow-hidden py-1 absolute before:rounded-xl 
                      rounded-large bottom-1 shadow-small ml-1 z-10">
                      <div className="text-white/80">
                        <div>{item.name}</div>
                        <div className="text-tiny">
                          {item.category.map((cat, index) => (
                            <span key={index}>
                              {categoriesSubtitles[cat as keyof typeof categoriesSubtitles]}
                              {index !== item.category.length - 1 && ', '}
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
      </div>
    </>
  );
}
