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
  // const beforeExtension = url.split('.').slice(0, -1).join('.');

  return (
    <Card
      radius="lg"
      className="border-none">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        // src={cardData?.episodepath?.split(".").slice(0, -1).join(".") + ".jpg"}
        src={"https://media-cache.cinematerial.com/p/500x/l35kpwhw/it-re-release-movie-poster.jpg"}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{cardData?.name}</p>
        <p className="text-tiny text-white/80">{cardData?.episodenumber}</p>
        <p className="text-tiny text-white/80">{cardData?.createddate}</p>
        <p className="text-tiny text-white/80">{cardData?.view}</p>
      </CardFooter>
    </Card>
  );
}
