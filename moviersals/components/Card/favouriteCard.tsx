import { Card, Link, Tooltip, Badge, Image } from "@nextui-org/react";
import moment from "moment";
import FavRemoveButton from "../Button/favRemoveButton";

interface CardEpisodeProps {
  movieid: string;
  moviename: string;
  publisher: string;
  publishyear: string;
  thumbnail: string;
  type: string;
  episodeid: string;
  episodenumber: string;
  episodename: string;
  createddate: string;
}

interface FavCardProps {
  cardData: CardEpisodeProps;
  onClickRemove?: (movieid: string, episodenumber: string) => void;
}

export default function FavouriteCard({ cardData, onClickRemove }: FavCardProps) {
  return (
    <div className="flex h-full">
      <Badge
        size="sm"
        content={
          <FavRemoveButton
            data={{ movieid: cardData?.movieid, episodenumber: cardData?.episodenumber }}
            showText={false}
            onClick={() => {
              console.log("remove fav clicked");
              onClickRemove(cardData?.movieid, cardData?.episodenumber);
            }}
          />
        }>
        <Card
          as={Link}
          href={`/detail/${cardData?.movieid}/${cardData?.episodenumber}`}
          radius="lg"
          className="border-none h-full">
          <div className="flex flex-col w-fit">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={140}
              src={cardData?.thumbnail || "https://media-cache.cinematerial.com/p/500x/l35kpwhw/it-re-release-movie-poster.jpg"}
              width={240}
            />
            <div className="flex flex-col p-4 w-full gap-2">
              <p className="text-md font-semibold text-white/80 mb-2">{cardData?.moviename}</p>
              <div className="flex justify-between">
                <p className="text-tiny text-white/60">{cardData?.type != "movie" ? "Tập " + cardData?.episodenumber : `  `}</p>
                <Tooltip
                  content={moment(cardData?.createddate).format("DD/MM/YYYY HH:mm:ss A")}
                  placement="bottom-end"
                  color="primary">
                  <p className="text-tiny text-white/70">{moment(cardData?.createddate).fromNow()}</p>
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>
      </Badge>
    </div>
  );
}
