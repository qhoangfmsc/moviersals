"use client";

import { CldUploadWidget } from "next-cloudinary";

interface VideoUploaderProps {
  folderName: string;
  videoName: string;
  onVideoUpload: (url: string) => void;
}

export default function VideoUploader({ videoName, folderName, onVideoUpload }: VideoUploaderProps) {
  const handleUploadResult = (error, result, widget) => {
    if (result?.event === "success") {
      onVideoUpload(result.info.secure_url);
      widget.close(); // Close the widget after a successful upload
    } else if (error) {
      onVideoUpload("error");
      console.error("Upload failed:", error);
      widget.close(); // Close the widget in case of an error
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
        onSuccess={(result, widget) => handleUploadResult(null, result, widget)}
        onError={(error, widget) => handleUploadResult(error, null, widget)}>
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
