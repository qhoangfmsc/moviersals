import { Button, card, Card, CardFooter, Chip, Image, Link } from "@nextui-org/react";
import { IconStar } from "../icons";

interface CardEpisodeProps {
  cardData: Record<string, any>;
  onCardClick: () => void;
}

export default function ReviewMovieCard({ cardData, onCardClick }: CardEpisodeProps) {
  return (
    <Card
      isFooterBlurred
      onPress={() => onCardClick()}
      radius="lg"
      className="border-none m-1 lg:m-8">
      <Image
        alt={cardData.name}
        className="object-cover"
        height={150}
        src={cardData.thumbnail}
        width={380}
      />
      <CardFooter className="justify-between">
        <div className=" dark:text-white/80">
          <div className="text-lg font-black">{cardData.name}</div>
          <div className="flex flex-row gap-4 my-1 items-center">
            <div className="text-sm  dark:text-white/50">{cardData.publishyear}</div>
            <div className="flex flex-row justify-start items-center">
              <IconStar
                fill={"#fbbf24"}
                width={14}
                height={14}
              />
              <div className="ml-[2px] text-sm text-amber-400">{Math.round(cardData.avgrating * 10) / 10 || 0.0}</div>
            </div>
            <Chip
              size="sm"
              radius="sm"
              color={cardData.ispremium ? "danger" : "primary"}
              variant="dot">
              {cardData.ispremium ? "Trả phí" : "Miễn phí"}
            </Chip>
          </div>
          <div className="text-tiny">
            {(Array.isArray(cardData?.categoriesvi) ? cardData.categoriesvi : JSON.parse(cardData.categoriesvi || "[]"))?.map(
              (cat: string, index: number) => (
                <span key={index}>
                  {cat}
                  {index !==
                    (Array.isArray(cardData.categoriesvi) ? cardData.categoriesvi : JSON.parse(cardData.categoriesvi || "[]")).length - 1 &&
                    ", "}
                </span>
              )
            )}
          </div>
        </div>
        <Button
          className="text-tiny  dark:text-white bg-black/50"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          as={Link}
          href={`/detail/${cardData.movieid}`}>
          Xem ngay
        </Button>
      </CardFooter>
    </Card>
  );
}
