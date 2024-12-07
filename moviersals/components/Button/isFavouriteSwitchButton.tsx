"use client";

import { useEffect, useState } from "react";
import FavRemoveButton from "./favRemoveButton";
import FavAddButton from "./favAddButton";

interface episodeInfo {
  movieid: string;
  episodenumber: string;
}

export default function IsFavouriteSwitch({ isFav, data }: { isFav: boolean; data: episodeInfo }) {
  const [isFavourite, setIsFavourite] = useState(isFav);

  useEffect(() => {
    setIsFavourite(isFav);
  }, [isFav]);

  const handleAddFavourite = async () => {
    setIsFavourite(true);
  };

  const handleRemoveFavourite = () => {
    setIsFavourite(false);
  };

  return (
    <div className="flex flex-row items-center ">
      {!isFavourite ? (
        <FavAddButton
          data={data}
          onClick={handleAddFavourite}
        />
      ) : (
        <FavRemoveButton
          data={data}
          onClick={handleRemoveFavourite}
        />
      )}
    </div>
  );
}
