import { Card, CardFooter, Image, Button, Link } from "@nextui-org/react";

export default function EpisodeCard({
  cardData,
}: {
  cardData: {
    name: string;
    episodepath: string;
    episodeid: string;
    episodenumber: string;
    createddate: string;
    view: string;
  };
}) {
  return (
    <Card
      radius="lg"
      className="border-none w-fit">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={180}
        // src={cardData?.episodepath?.split(".").slice(0, -1).join(".") + ".jpg"}
        src={"https://media-cache.cinematerial.com/p/500x/l35kpwhw/it-re-release-movie-poster.jpg"}
        width={280}
      />
      <CardFooter className="flex flex-col items-start">
        <p className="text-1xl text-white/80 mb-2">{"Episode " + cardData?.episodenumber}</p>
        <p className="text-tiny text-white/80 mb-2">{cardData?.name}</p>
        <p className="text-tiny text-white/80 mb-2">{"View " + cardData?.view}</p>
      </CardFooter>
    </Card>
  );
}
