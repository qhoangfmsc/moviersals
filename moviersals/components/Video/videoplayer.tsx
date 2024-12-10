import React, { useEffect, useRef } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import increaseViewEpisode from "@/app/api/episode/increaseViewEpisode";
import Script from "next/script";

export interface CloudinaryVideoPlayerUI {
  movieid: string;
  episodenumber: string;
  publicid: string;
  userinfo: any;
}

const CloudinaryVideoPlayer = ({ movieid, episodenumber, publicid, userinfo }: CloudinaryVideoPlayerUI) => {
  const adTagUrl =
    "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=";

  async function increaseView() {
    const request = {
      movieid: movieid,
      episodenumber: episodenumber,
    };
    const response = await increaseViewEpisode(request);
    console.log("View increased:", response.content);
  }

  const handlePercentsPlayed = (event) => {
    console.log("percent: ", event.eventData.percent);
    if (event.eventData.percent === 30) {
      increaseView();
    }
  };

  const initializePlayer = ({ player }) => {
    if (player) {
      player.on("percentsplayed", handlePercentsPlayed);
    }
  };

  const cleanupPlayer = ({ player }) => {
    if (player) {
      player.off("percentsplayed", handlePercentsPlayed);
      console.log("Event listener cleaned up");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js" />
      {userinfo != null ? (
        <div className="w-[60%]">
          <CldVideoPlayer
            {...(!userinfo.ispremium && {
              ads: {
                adTagUrl: adTagUrl,
                showCountdown: true,
                adLabel: "Advertisement",
                prerollTimeout: 5000,
                locale: "vi",
              },
            })}
            width={1280}
            height={720}
            playedEventPercents={[10, 30, 50, 70, 100]}
            src={publicid}
            transformation={{
              streaming_profile: userinfo.ispremium ? "full_hd" : "hd",
            }}
            onPlay={initializePlayer}
            onEnded={cleanupPlayer}
            sourceTypes={["hls"]}
            // onPlay={increaseView}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center text-2xl font-semibold">Hãy đăng nhập để xem phim nhé</div>
      )}
    </div>
  );
};

export default CloudinaryVideoPlayer;
