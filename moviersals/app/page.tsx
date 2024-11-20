"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import MoviersalsIntroduction from "@/components/Introduction/moviersalsIntroduction";
import ValorantIntroduction from "@/components/Introduction/valorantIntroduction";
import MoviesIntroduction from "@/components/Movies/moviesIntroduction";
import React from "react";

export default function Home() {
  return (
    <>
      <ValorantIntroduction />
      <MoviesIntroduction />
      <MoviersalsIntroduction />
      <PaypalButon totalAmount={100} />
    </>
  );
}
