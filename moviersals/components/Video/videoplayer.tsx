import React from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export interface CloudinaryVideoPlayerUI {
  publicIdVP: string,
  widthVP: string,
  heightVP: string,
}

const CloudinaryVideoPlayer = ({ publicIdVP, widthVP, heightVP }: CloudinaryVideoPlayerUI) => {
  return (
    <div style={{
      width: widthVP ? widthVP : "800px", 
      height: heightVP ? heightVP : "600px",
    }}>
      <CldVideoPlayer
        id="adaptive-bitrate-streaming"
        src={publicIdVP}
        transformation={{
          streaming_profile: "hd",
        }}
        sourceTypes={["hls"]}
      />
    </div>
  );
};

export default CloudinaryVideoPlayer;
