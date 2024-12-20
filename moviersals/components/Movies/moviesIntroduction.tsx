"use client";

import StreamIntroduction from "../Stream/streamIntroduction";
import MoviesTop from "./moviesTop";
import MoviesTopCarousel from "./moviesTopCarousel";
import { useEffect, useState } from "react";
import getAllMovie from "@/app/api/movies/getAllMovie";
import MoviesIntroductionCategories from "./moviesIntroductionCategories";

export default function MoviesIntroduction() {
  const [dataVideos, setDataVideos] = useState<any>(null);

  useEffect(() => {
    getAllMovieData();
  }, []);

  async function getAllMovieData() {
    const response = await getAllMovie(1);
    setDataVideos(response.content);
  }

  return (
    <div className="w-full my-14 p-6 lg:p-16">
      <div className="hidden lg:block">
        <MoviesTopCarousel
          title="10 bộ phim thịnh hành nhất Moviersals"
          dataVideos={dataVideos?.list}
        />
      </div>
      <div className="block lg:hidden overflow-hidden">
        <MoviesTop
          title="10 bộ phim thịnh hành nhất Moviersals"
          dataVideos={dataVideos?.list}
        />
      </div>
      <div className="flex flex-col mx-4 lg:mx-12 my-4 lg:my-28">
        <StreamIntroduction
          title={
            <span>
              Chức năng sắp có mặt tại <b>Moviersals</b>
            </span>
          }
          subtitle={<span>LIVESTREAM</span>}
        />
      </div>
      <div className="flex w-full flex-col items-center my-14">
        <MoviesIntroductionCategories dataVideos={dataVideos?.list} />
      </div>
    </div>
  );
}
