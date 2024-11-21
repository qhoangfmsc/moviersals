"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import MoviersalsIntroduction from "@/components/Introduction/moviersalsIntroduction";
import ValorantIntroduction from "@/components/Introduction/valorantIntroduction";
import MoviesIntroduction from "@/components/Movies/moviesIntroduction";
import React from "react";
import CloudinaryVideoPlayer from "./videoplayer";

export default function Home() {
  return (
    <>
      <div>
        <CloudinaryVideoPlayer publicId="5second_1_smw5cw" />
      </div>
      {/* <ValorantIntroduction />
      <MoviesIntroduction />
      <MoviersalsIntroduction /> */}
      <PaypalButon totalAmount={100} />
    </>
  );
}
