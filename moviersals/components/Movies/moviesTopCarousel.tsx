"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { DotButton, useDotButton } from "../EmblaCarousel/controls/EmblaCarouselDotButtons";
import { NextButton, PrevButton, usePrevNextButtons } from "../EmblaCarousel/controls/EmblaCarouselArrowButtons";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import { IconStar } from "../icons";

interface Video {
  id: number;
  movieid: string;
  name: string;
  publisher: string;
  categories: string[];
  description: string;
  thumbnail: string;
  [key: string]: any; // Allows any additional dynamic properties
}

interface MovieTopUIProps {
  title: string;
  dataVideos: Video[]; // An array of Video objects
}

export default function MoviesTopCarousel({ title, dataVideos }: Readonly<MovieTopUIProps>): JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true }, [Autoplay()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="px-10">
      <h3 className="text-2xl mb-6">{title}</h3>
      <section className="embla">
        <div
          className="embla__viewport"
          ref={emblaRef}>
          <div className="embla__container">
            {dataVideos?.map((item) => (
              <div
                className="embla__slide"
                key={item.id}>
                <div className="relative snap-center shrink-0 w-full">
                  <div
                    className="absolute text-black"
                    style={{
                      top: "-1rem",
                      left: "1rem",
                      zIndex: "15",
                    }}>
                    <span
                      style={{
                        fontSize: "3rem",
                        textShadow:
                          "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                      }}>
                      #
                    </span>

                    <span
                      style={{
                        fontSize: "5rem",
                        textShadow:
                          "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                      }}>
                      {item.id}
                    </span>
                  </div>

                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="relative border-none m-2 lg:mx-8">
                    {item.ispremium && (
                      <div
                        className="absolute 
                        w-[200px] text-xl shadow-2xl 
                        bg-gradient-to-r from-danger-600
                        text-amber-100 font-bold 
                        z-20 rounded
                        border-2 border-white
                        text-center"
                        style={{
                          top: "0.5rem",
                          left: "calc(100% - 200px)",
                        }}>
                        Yêu cầu trả phí
                      </div>
                    )}
                    <Image
                      alt={item.name}
                      className="object-cover"
                      src={item.thumbnail}
                      height={500}
                      width={2000}
                    />
                    <CardFooter className="justify-between">
                      <div className="text-white/80">
                        <div className="flex flex-row justify-start items-center">
                          <IconStar
                            fill={"#fbbf24"}
                            width={26}
                            height={26}
                          />
                          <div className="ml-[2px] text-xl text-amber-400">{Math.round(item.avgrating * 10) / 10 || 0.0}</div>
                        </div>
                        <div>{item.name}</div>
                        <div className="text-tiny">
                          {(Array.isArray(item.categoriesvi) ? item.categoriesvi : JSON.parse(item.categoriesvi || "[]")).map(
                            (cat: string, index: number) => (
                              <span key={index}>
                                {cat}
                                {index !==
                                  (Array.isArray(item.categoriesvi) ? item.categoriesvi : JSON.parse(item.categoriesvi || "[]")).length -
                                  1 && ", "}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <Button
                        className="text-tiny text-white bg-black/50"
                        variant="flat"
                        color="default"
                        radius="lg"
                        size="sm"
                        as={Link}
                        href={`/detail/${item.movieid}`}>
                        Xem ngay
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
              />
            ))}
          </div>
        </div>
      </section >
    </div >
  );
}
