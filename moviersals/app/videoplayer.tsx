import React from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const CloudinaryVideoPlayer = ({ publicId }) => {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <CldVideoPlayer
        id="adaptive-bitrate-streaming"
        // width="800"
        // height="600"
        src={publicId}
        transformation={{
          streaming_profile: "hd",
        }}
        sourceTypes={["hls"]}
      />
    </div>
  );
};

export default CloudinaryVideoPlayer;
