import { Card, CardFooter, Image, Button, Link } from "@nextui-org/react";

interface CardEpisodeProps {
  cardData: {
    name: string;
    episodepath: string;
    episodeid: string;
    episodenumber: string;
    createddate: string;
    view: string;
  };
  onCardClick: () => void;
}

export default function EpisodeCard({ cardData, onCardClick }: CardEpisodeProps) {
  return (
    <Card
      isPressable={cardData ? false : true}
      onPress={() => onCardClick()}
      radius="lg"
      className="border-none w-fit">
      <Image
        alt="Woman listing to music"
        className={cardData ? "object-cover" : "object-contain"}
        height={cardData ? 180 : 100}
        style={{ margin: cardData ? "0px 0px" : "50px 0px" }}
        // src={cardData?.episodepath?.split(".").slice(0, -1).join(".") + ".jpg"}
        src={cardData ? "https://media-cache.cinematerial.com/p/500x/l35kpwhw/it-re-release-movie-poster.jpg" : "/image/plus.png"}
        width={cardData ? 280 : 280}
      />
      {cardData ? (
        <CardFooter className="flex flex-col items-start">
          <p className="text-1xl text-white/80 mb-2">{"Episode " + cardData?.episodenumber}</p>
          <p className="text-tiny text-white/80 mb-2">{cardData?.name}</p>
          <p className="text-tiny text-white/80 mb-2">{"View " + cardData?.view}</p>
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-col items-center">
          <p className="text-2xl text-white/90 mb-2">{"Thêm mới"}</p>
        </CardFooter>
      )}
    </Card>
  );
}
