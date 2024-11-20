"use client"

import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import React from "react";
import { DotButton, useDotButton } from "../EmblaCarousel/controls/EmblaCarouselDotButtons";
import { NextButton, PrevButton, usePrevNextButtons } from "../EmblaCarousel/controls/EmblaCarouselArrowButtons";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";

const trendingVideos = videosMockup;

interface MovieTopUIProps {
    title: string;
}

export default function MoviesTopCarousel({ title }: Readonly<MovieTopUIProps>): JSX.Element {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true }, [Autoplay()])
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="px-10">
            <h3 className="text-2xl mb-6">{title}</h3>
            <section className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {trendingVideos.map((item) => (
                            <div className="embla__slide" key={item.id}>
                                <div className="relative snap-center shrink-0 w-full">
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
                                            src={item.thumbnail}
                                            height={600}
                                            width={2000}
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
                                            <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm"
                                                as={Link} href={`/detail/${item.id}`}>
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
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>

                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={'embla__dot'.concat(
                                    index === selectedIndex ? ' embla__dot--selected' : ''
                                )}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
