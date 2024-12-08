"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import uploadEpisode from "@/app/api/episode/uploadEpisode";
import VideoUploader from "../Cloudinary/uploadvideo";
import { showResponseToast } from "@/lib/utils";

export default function AddNewEpisodeAdminForm({ movieid, handleClose }: { movieid: string; handleClose: () => void }) {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("");

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  const hangleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setVideoName(movieid + "_" + e.target.value);
    }
  };

  const handleVideoUpload = (url: string) => {
    console.log("Url: ", url);
    setUploadedVideoUrl(url);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const episodename = formData.get("name")?.toString();
      const episodepath = uploadedVideoUrl;
      const episodenumber = formData.get("episodenumber")?.toString();
      const movieid = params?.movieid as string;

      console.log(episodename, episodepath, episodenumber, movieid);

      if (episodename && episodepath && episodenumber && movieid) {
        const response = await uploadEpisode(movieid, episodename, episodepath, episodenumber);
        setIsLoading(false);
        showResponseToast(response);
        if (response.result == "success") {
          setIsLoading(false);
          handleClose();
        } else {
          setIsLoading(false);
          setError(response.content);
        }
      } else {
        setIsLoading(false);
        setError("Vui lòng nhập đầy đủ thông tin!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setError(error.message);
      }
    }
  }

  return (
    <form
      className="flex flex-col items-left border-none rounded-lg w-full"
      onSubmit={onSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Input
        size="lg"
        className="w-full"
        type="text"
        name="name"
        variant="underlined"
        label="Tên tập phim"
      />
      <Input
        size="lg"
        className="w-full"
        type="number"
        onChange={(e) => hangleValueChange(e)}
        onWheel={(e) => handleWheel(e)}
        name="episodenumber"
        variant="underlined"
        label="Tập phim thứ"
      />
      <div className="flex flex-row">
        <Input
          defaultValue="null"
          size="lg"
          className="w-full"
          type="text"
          name="episodepath"
          variant="underlined"
          // value={uploadedVideoUrl}
          onChange={(e) => setUploadedVideoUrl(e.target.value)}
          label="Đường dẫn tập phim"
        />
        <VideoUploader
          videoName={videoName}
          folderName={movieid}
          onVideoUpload={handleVideoUpload}
        />
      </div>
      <Button
        size="lg"
        className="mt-8 mb-4 w-full"
        type="submit"
        disabled={isLoading}
        variant="shadow"
        color="success">
        {isLoading ? "Loading..." : "Thêm tập phim"}
      </Button>
    </form>
  );
}
