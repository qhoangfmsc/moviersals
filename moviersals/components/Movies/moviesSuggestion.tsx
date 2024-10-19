"use client"

import { NextButton, PrevButton, usePrevNextButtons } from "@/components/EmblaCarousel/controls/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "@/components/EmblaCarousel/controls/EmblaCarouselDotButtons";
import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { videosMockup } from "@/config/videosMockup";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";

const trendingVideos = videosMockup;

export default function MovieSuggestion() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true })
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (

        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {trendingVideos.map((item) => (
                        <div className="embla__slide" key={item.id}>
                            <Card
                                isFooterBlurred
                                radius="lg"
                                className="border-none"
                            >
                                <Image
                                    alt={item.name}
                                    className="object-cover"
                                    src={item.thumbnail}
                                    height={200}
                                    width={2000}
                                />
                                <CardFooter className="justify-between h-full">
                                    <div className="text-white/80 w-4/5">
                                        <div className="font-black">{item.name}</div>
                                        <div className="text-sm">
                                            {item.categories.map((cat, index) => (
                                                <span key={index}>
                                                    {categoriesSubtitles[cat as keyof typeof categoriesSubtitles].vietsub}
                                                    {index !== item.categories.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-tiny text-gray-500 webkit-line-2 mt-2">{item.description}</div>
                                    </div>
                                    <Button className="text-tiny text-white bg-black/50" variant="flat" color="default" radius="lg" size="sm"
                                        as={Link} href={`/detail/${item.id}`}>
                                        Xem ngay
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls mt-3">
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
    );
}