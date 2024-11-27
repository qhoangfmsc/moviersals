"use client";
import { CldUploadWidget } from "next-cloudinary";

interface VideoUploaderProps {
  folderName: string;
  videoName: string;
  onVideoUpload: (url: string) => void;
}

export default function VideoUploader({ videoName, folderName, onVideoUpload }: VideoUploaderProps) {
  const handleUploadResult = (result) => {
    console.log("result is: ", result);
    if (result.event == "success") {
      onVideoUpload(result.info.secure_url);
    } else {
      console.error("Upload failed");
    }
  };

  return (
    <div className="text-center flex justify-end pt-5 pl-1">
      <CldUploadWidget
        signatureEndpoint={"/api/cloudinary"}
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          publicId: videoName,
          folder: folderName,
          uploadPreset: "ml_default",
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          uploadSignatureTimestamp: Math.floor(Date.now() / 1000),
        }}
        onSuccess={handleUploadResult}>
        {({ open }) => (
          <button
            className="w-max"
            type="button"
            onClick={() => {
              open();
            }}
            style={{
              backgroundColor: "#6586ff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Tải video lên
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
