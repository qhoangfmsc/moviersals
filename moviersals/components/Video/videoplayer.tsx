import React, { useEffect, useRef, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import increaseViewEpisode from "@/app/api/episode/increaseViewEpisode";
import Script from "next/script";

export interface CloudinaryVideoPlayerUI {
  movieid: string;
  episodeid: string;
  publicid: string;
  widthVP: string;
  heightVP: string;
}

const CloudinaryVideoPlayer = ({ movieid, episodeid, publicid, widthVP, heightVP }: CloudinaryVideoPlayerUI) => {
  const playerRef = useRef(null);
  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  const adTagUrl =
    "//pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=";

  useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current;

      // Listen for the play event to trigger increaseView after 5 seconds
      const onPlayHandler = () => {
        setTimeout(() => {
          increaseView(); // Call the function after 5 seconds
        }, 5000); // 5000 ms = 5 seconds
      };

      // Add the event listener to start the timeout when the video starts playing
      player.on("play", onPlayHandler);

      // Listen for the quality change event
      player.on("qualityChanged", (event) => {
        console.log("Quality changed to:", event.quality);
      });

      // Clean up the event listener on unmount
      return () => {
        player.off("play", onPlayHandler); // Clean up play event listener
        player.off("qualityChanged"); // Clean up quality change event listener
      };
    }
  }, [movieid, episodeid]);

  async function increaseView() {
    const request = {
      movieid: movieid,
      episodeid: episodeid,
    };
    const response = await increaseViewEpisode(request);
    console.log("View increased:", response.content);
  }

  return (
    <div>
      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        async
      />
      {userinfo != null ? (
        <div
          style={{
            width: widthVP ? widthVP : "800px",
            height: heightVP ? heightVP : "600px",
          }}>
          <CldVideoPlayer
            src={publicid}
            playerRef={playerRef}
            transformation={{
              streaming_profile: userinfo.ispremium ? "hd" : "sd",
            }}
            sourceTypes={["hls"]}
            // onPlay={increaseView}
            {...(!userinfo.ispremium && {
              ads: {
                adTagUrl: adTagUrl,
                showCountdown: true,
                adLabel: "Advertisement",
                prerollTimeout: 5000,
                locale: "vi",
              },
            })}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-semibold">Hãy đăng nhập để xem phim nhé</div>
      )}
    </div>
  );
};

export default CloudinaryVideoPlayer;
