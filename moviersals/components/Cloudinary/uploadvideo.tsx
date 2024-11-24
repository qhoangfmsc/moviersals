"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface VideoUploaderProps {
  folderName: string;
  videoName: string;
  onVideoUpload: (url: string) => void;
}

export default function VideoUploader({ videoName, folderName, onVideoUpload }: VideoUploaderProps) {
  const handleUploadResult = (error, result) => {
    if (result?.event === "success") {
      onVideoUpload(result.info.secure_url);
    } else if (error) {
      onVideoUpload("error");
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <CldUploadWidget
        // uploadPreset="your_upload_preset"
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          publicId: videoName,
          folder: folderName,
          uploadPreset: "default-preset",
        }}
        onSuccess={handleUploadResult}>
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Upload video
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
