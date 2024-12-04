"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { IconHeartAlready, IconHeartNotYet } from "../icons";

export default function IsFavouriteSwitch() {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddFavourite = () => {
    setIsFavourite(true);
  };

  const handleRemoveFavourite = () => {
    setIsFavourite(false);
  };

  return (
    <div className="flex flex-row items-center ">
      {isFavourite ? (
        <Button
          variant="light"
          onClick={handleRemoveFavourite}>
          <IconHeartAlready /> Thêm yêu thích
        </Button>
      ) : (
        <Button
          variant="light"
          onClick={handleAddFavourite}>
          <IconHeartNotYet /> Bỏ yêu thích
        </Button>
      )}
    </div>
  );
}
