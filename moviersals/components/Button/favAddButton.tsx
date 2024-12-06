"use client";

import { Button } from "@nextui-org/button";
import { IconHeartNotYet } from "../icons";
import addFavouriteEpisode from "@/app/api/favourite/addFavouriteEpisode";
import { showResponseToast } from "@/lib/utils";
import { useState } from "react";

interface EpisodeInfo {
  movieid: string;
  episodenumber: string;
}

interface FavAddButtonProps {
  data: EpisodeInfo;
  onClick?: () => void;
  showText?: boolean;
}

export default function FavAddButton({ data, onClick, showText = true }: FavAddButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  const handleAddFavourite = async () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
    if (checkIfLoggedin()) {
      const request = {
        ...data,
        userid: userinfo.id,
      };
      const response = await addFavouriteEpisode(request);
      if (response.status == "success") {
        onClick();
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
    <Button
      isIconOnly={!showText}
      disabled={isDisabled}
      variant="light"
      onClick={handleAddFavourite}>
      <IconHeartNotYet />
      {showText ? "Thêm yêu thích" : ""}
    </Button>
  );
}
