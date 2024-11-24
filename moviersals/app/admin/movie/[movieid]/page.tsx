"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useEffect, useState } from "react";
import uploadEpisode from "@/api/episode/uploadEpisode";
import getMovieDetailById from "@/api/movies/getMovieById";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { title } from "@/components/primitives";
import EpisodeCard from "@/components/Card/episodeCard";

export default function episodeEpisodesListForm({ params }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});

  const fetchData = async () => {
    const response = await getMovieDetailById(params.movieid);
    const content = await response.content;
    console.log(content);
    setData(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        } else {
          setError(response.content);
        }
      } else {
        setError("Vui lòng nhập đầy đủ thông tin!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div>
      <h1 className={title()}>
        Quản lý phim {data?.movieDetail?.name}
        <span className={"text-4xl ml-4 text-gray-400"}>(#{data?.movieDetail?.movieid})</span>
      </h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
        <BreadcrumbItem href={`/admin/movie/${data?.movieDetail?.movieid}`}>{data?.movieDetail?.name}</BreadcrumbItem>
      </Breadcrumbs>

      <form
        className="flex flex-col my-8 items-left border border-gray-300 p-8 rounded-lg w-fit"
        onSubmit={onSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Input
          size="lg"
          className="max-w-[200px]"
          type="text"
          name="name"
          variant="underlined"
          label="Tên tập phim"
        />
        <Input
          size="lg"
          className="max-w-[200px]"
          type="text"
          name="episodepath"
          variant="underlined"
          label="Đường dẫn tập phim"
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
          className="mt-8 mb-4 w-[200px]"
          type="submit"
          disabled={isLoading}
          variant="shadow"
          color="success">
          {isLoading ? "Loading..." : "Thêm tập phim"}
        </Button>
      </form>

      {data?.list?.length > 0 && <EpisodeCard cardData={data?.list?.[0]} />}
    </div>
  );
}
