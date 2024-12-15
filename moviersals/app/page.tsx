import MoviersalsIntroduction from "@/components/Introduction/moviersalsIntroduction";
import ValorantIntroduction from "@/components/Introduction/valorantIntroduction";
import Transition from "@/components/MotionFramer/transition";
import MoviesIntroduction from "@/components/Movies/moviesIntroduction";
import React from "react";

export default function Home() {
  return (
    <>
      <Transition>
        <ValorantIntroduction />
        <MoviesIntroduction />
        <MoviersalsIntroduction />
      </Transition>
    </>
  );
}
