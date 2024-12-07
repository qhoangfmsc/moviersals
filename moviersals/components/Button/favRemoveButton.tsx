"use client";

import { Button } from "@nextui-org/button";
import { IconHeartAlready } from "../icons";
import { showResponseToast } from "@/lib/utils";
import removeFavouriteEpisode from "@/app/api/favourite/removeFavouriteEpisode";
import { useState } from "react";
import { Tooltip } from "@nextui-org/react";

interface EpisodeInfo {
  movieid: string;
  episodenumber: string;
}

interface FavAddButtonProps {
  data: EpisodeInfo;
  onClick?: () => void;
  showText?: boolean;
}

export default function FavRemoveButton({ data, onClick, showText = true }: FavAddButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  const handleRemoveFavourite = async () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
    if (checkIfLoggedin()) {
      const request = {
        ...data,
        userid: userinfo.id,
      };
      const response = await removeFavouriteEpisode(request);
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
    <Tooltip
      content="Bỏ yêu thích"
      placement="top-end">
      <Button
        isIconOnly={!showText}
        disabled={isDisabled}
        variant="light"
        onClick={handleRemoveFavourite}>
        <IconHeartAlready /> {showText ? "Bỏ yêu thích" : ""}
      </Button>
    </Tooltip>
  );
}
