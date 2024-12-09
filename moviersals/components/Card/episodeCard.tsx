import { Card, CardFooter, Image } from "@nextui-org/react";

interface CardEpisodeProps {
  cardData?: Record<string, any>;
  onCardClick?: (itemData: CardEpisodeProps["cardData"] | null) => void;
}

export default function AdminEpisodeCard({ cardData, onCardClick }: CardEpisodeProps) {
  return (
    <Card
      isPressable={cardData ? false : true}
      radius="lg"
      className="border-none w-fit">
      <Image
        onClick={() => onCardClick(cardData)}
        alt="Thumbnail"
        className={`${cardData ? "object-cover" : "object-contain"}`}
        height={cardData ? 180 : 100}
        style={{ margin: cardData ? "0px 0px" : "50px 0px" }}
        src={cardData ? "https://media-cache.cinematerial.com/p/500x/l35kpwhw/it-re-release-movie-poster.jpg" : "/image/plus.png"}
        width={cardData ? 280 : 280}
      />
      {cardData ? (
        <CardFooter className="flex flex-col items-start"
          onClick={() => onCardClick(cardData)}
        >
          <p className="text-1xl text-white/80 mb-2">{"Tập " + cardData?.episodenumber}</p>
          <p className="text-tiny text-white/80 mb-2">{cardData?.name}</p>
          <p className="text-tiny text-white/80 mb-2">{"Lượt xem " + cardData?.view}</p>
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-col items-center">
          <p className="text-2xl text-white/90 mb-2">{"Thêm mới"}</p>
        </CardFooter>
      )}
    </Card>
  );
}
