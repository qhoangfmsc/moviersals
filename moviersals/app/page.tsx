"use client"

import MoviersalsIntroduction from "@/components/Introduction/moviersalsIntroduction";
import ValorantIntroduction from "@/components/Introduction/valorantIntroduction";
import MoviesCategories from "@/components/Movies/moviesCategories";
import MoviesTop from "@/components/Movies/moviesTop";
import { Image } from "@nextui-org/react";
import React from "react";

export default function Home() {
  return (
    <>
      <ValorantIntroduction />
      <div className="w-full my-14 p-6 lg:p-16">
        <MoviesTop title="10 bộ phim thịnh hành nhất hiện nay" />
        <div className="flex w-full flex-col items-center my-14">
          <MoviesCategories />
        </div>
      </div>
      <MoviersalsIntroduction />
    </>
  );
}
