"use client";

import { NextButton, PrevButton, usePrevNextButtons } from "@/components/EmblaCarousel/controls/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "@/components/EmblaCarousel/controls/EmblaCarouselDotButtons";
import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import { useParams } from "next/navigation";

export default function EpisodeListCarousel({ movieData }: { movieData: Record<string, any> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div
        className="embla__viewport"
        ref={emblaRef}>
        <div className="embla__container">
          {movieData?.list?.map((item) => (
            <div
              className="embla__slide"
              key={item.episodeid}>
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none">
                <Image
                  alt="Episode"
                  className="object-cover"
                  src={movieData?.movieDetail?.thumbnail}
                  height={200}
                  width={2000}
                />
                <CardFooter className="justify-between">
                  <div className="text-white/80 text-sm">
                    <div>
                      Tập {item.episodenumber}: {item.name}
                    </div>
                  </div>
                  <Button
                    className="text-tiny text-white bg-black/50"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    as={Link}
                    href={`/detail/${movieData?.movieDetail?.movieid}/${item.episodenumber}`}>
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
    </section>
  );
}
