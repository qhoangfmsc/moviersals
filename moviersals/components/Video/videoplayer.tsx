import React, { useEffect, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import increaseViewEpisode from "@/app/api/episode/increaseViewEpisode";

export interface CloudinaryVideoPlayerUI {
  episode: Record<string, any>,
  widthVP: string,
  heightVP: string,
}

const CloudinaryVideoPlayer = ({ episode, widthVP, heightVP }: CloudinaryVideoPlayerUI) => {
  const [episodeSrc, setEpisodeSrc] = useState<string>(null);

  useEffect(() => {
    getSrcEpisode();
  }, []);

  function getSrcEpisode() {
    const parts = episode?.episodepath?.split('/');
    const episodeSource = parts?.slice(-2).join('/');
    setEpisodeSrc(episodeSource);
  }

  async function increaseView() {
    const request = {
      "movieid": episode?.movieid,
      "episodeid": episode?.episodeid
    }
    const response = await increaseViewEpisode(request);
  };

  return (
    <div style={{
      width: widthVP ? widthVP : "800px",
      height: heightVP ? heightVP : "600px",
    }}>
      {episodeSrc && (
        <CldVideoPlayer
          id="adaptive-bitrate-streaming"
          src={episodeSrc}
          transformation={{ streaming_profile: "hd" }}
          sourceTypes={["hls"]}
          onPlay={increaseView}
        />
      )}
    </div>
  );
};

export default CloudinaryVideoPlayer;
