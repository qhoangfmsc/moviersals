import React, { useEffect, useRef, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import increaseViewEpisode from "@/app/api/episode/increaseViewEpisode";

export interface CloudinaryVideoPlayerUI {
  movieid: string;
  episodeid: string;
  publicid: string;
  widthVP: string;
  heightVP: string;
}

const CloudinaryVideoPlayer = ({ movieid, episodeid, publicid, widthVP, heightVP }: CloudinaryVideoPlayerUI) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      // Access the Cloudinary Video Player instance
      const player = playerRef.current;

      // Listen for the quality change event
      player.on("qualityChanged", (event) => {
        console.log("Quality changed to:", event.quality);
      });

      // Clean up the event listener
      return () => {
        player.off("qualityChanged");
      };
    }
  }, []);

  async function increaseView() {
    const request = {
      movieid: movieid,
      episodeid: episodeid,
    };
    const response = await increaseViewEpisode(request);
  }

  return (
    <div
      style={{
        width: widthVP ? widthVP : "800px",
        height: heightVP ? heightVP : "600px",
      }}>
      <CldVideoPlayer
        src={publicid}
        playerRef={playerRef}
        transformation={{
          streaming_profile: "hd",
        }}
        sourceTypes={["hls"]}
        // onPlay={increaseView}
      />
    </div>
  );
};

export default CloudinaryVideoPlayer;
