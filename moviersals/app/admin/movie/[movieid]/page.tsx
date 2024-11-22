"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useEffect, useState } from "react";
import GoogleSignInButton from "@/components/Button/googleSignInButton";
import login from "@/api/account/login";
import { useParams, usePathname, useRouter } from "next/navigation";
import uploadEpisode from "@/api/episode/uploadEpisode";

export default function episodeEpisodesListForm() {
  // const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let testdata = "";

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const episodename = formData.get("name")?.toString();
      const episodepath = formData.get("episodepath")?.toString();
      const episodenumber = formData.get("episodenumber")?.toString();
      const movieid = params?.movieid as string;

      console.log(episodename, episodepath, episodenumber, movieid);

      if (episodename && episodepath && episodenumber && movieid) {
        const response = await uploadEpisode(movieid, episodename, episodepath, episodenumber);
        setIsLoading(false);
        if (response.result == "success") {
          setIsLoading(false);
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
    <div>
      <div></div>
      <form
        className="flex flex-col my-8 items-left border border-gray-300 p-8 rounded-lg w-fit"
        onSubmit={onSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Input
          size="lg"
          className="max-w-[350px]"
          type="text"
          name="name"
          variant="underlined"
          label="Tên tập phim"
        />
        <Input
          size="lg"
          className="max-w-[350px]"
          type="text"
          name="episodepath"
          variant="underlined"
          label="Đường dẫn tới tập phim"
        />
        <Input
          size="lg"
          className="max-w-[200px]"
          type="number"
          onWheel={(e) => handleWheel(e)}
          name="episodenumber"
          variant="underlined"
          label="Tập phim thứ"
        />
        <Button
          size="lg"
          className="mt-8 mb-4 w-[350px]"
          type="submit"
          disabled={isLoading}
          variant="shadow"
          color="success">
          {isLoading ? "Loading..." : "Upload tập phim"}
        </Button>
      </form>
    </div>
  );
}
