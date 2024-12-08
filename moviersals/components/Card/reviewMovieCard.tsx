import { Button, Card, CardFooter, Image, Link } from "@nextui-org/react";

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
        <div className="text-white/80">
          <div className="font-black">{cardData.name}</div>
          <div className="text-tiny">
            {(Array.isArray(cardData?.categoriesvi) ? cardData.categoriesvi : JSON.parse(cardData.categoriesvi || "[]"))?.map(
              (cat: string, index: number) => (
                <span key={index}>
                  {cat}
                  {index !==
                    (Array.isArray(cardData.categoriesvi) ? cardData.categoriesvi : JSON.parse(cardData.categoriesvi || "[]"))
                      .length -
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
          href={`/detail/${cardData.movieid}`}>
          Xem ngay
        </Button>
      </CardFooter>
    </Card>
  );
}
