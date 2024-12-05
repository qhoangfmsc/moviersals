"use client";

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { IconHeartAlready, IconHeartNotYet } from "../icons";
import addFavouriteEpisode from "@/app/api/favourite/addFavouriteEpisode";
import { user } from "@nextui-org/theme";
import { showResponseToast } from "@/lib/utils";
import removeFavouriteEpisode from "@/app/api/favourite/removeFavouriteEpisode";

interface episodeInfo {
  movieid: string;
  episodenumber: string;
}

export default function IsFavouriteSwitch({ isFav, data }: { isFav: boolean; data: episodeInfo }) {
  const [isFavourite, setIsFavourite] = useState(isFav);
  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  useEffect(() => {
    console.log("wat: ", isFav);
    setIsFavourite(isFav);
  }, [isFav]);

  const handleAddFavourite = async () => {
    if (checkIfLoggedin()) {
      const request = {
        ...data,
        userid: userinfo.id,
      };
      const response = await addFavouriteEpisode(request);
      if (response.status == "success") {
        setIsFavourite(true);
      }
      showResponseToast(response);
    }
  };

  const handleRemoveFavourite = async () => {
    if (checkIfLoggedin()) {
      const request = {
        ...data,
        userid: userinfo.id,
      };
      const response = await removeFavouriteEpisode(request);
      if (response.status == "success") {
        setIsFavourite(false);
      }
      showResponseToast(response);
    }
  };

  const checkIfLoggedin = () => {
    if (userinfo == null || userinfo.id == null) {
      showResponseToast({
        status: "error",
        message: "Vui lòng đăng nhập trước khi thực hiện hành động này!",
      });
      return false;
    } else return true;
  };

  return (
    <div className="flex flex-row items-center ">
      {!isFavourite ? (
        <Button
          variant="light"
          onClick={handleAddFavourite}>
          <IconHeartNotYet /> Thêm yêu thích
        </Button>
      ) : (
        <Button
          variant="light"
          onClick={handleRemoveFavourite}>
          <IconHeartAlready /> Bỏ yêu thích
        </Button>
      )}
    </div>
  );
}
