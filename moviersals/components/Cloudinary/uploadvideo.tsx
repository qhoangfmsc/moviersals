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
    <div className="text-center mt-4 mb-4">
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
            type="button"
            onClick={() => {
              open();
            }}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
