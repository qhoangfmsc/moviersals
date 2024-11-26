import React from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export interface CloudinaryVideoPlayerUI {
  srcVP: string,
  widthVP: string,
  heightVP: string,
}

const CloudinaryVideoPlayer = ({ srcVP, widthVP, heightVP }: CloudinaryVideoPlayerUI) => {
  return (
    <div style={{
      width: widthVP ? widthVP : "800px", 
      height: heightVP ? heightVP : "600px",
    }}>
      <CldVideoPlayer
        id="adaptive-bitrate-streaming"
        src={srcVP}
        transformation={{
          streaming_profile: "hd",
        }}
        sourceTypes={["hls"]}
      />
    </div>
  );
};

export default CloudinaryVideoPlayer;
