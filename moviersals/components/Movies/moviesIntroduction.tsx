"use client"

import { videosMockup } from "@/config/videosMockup"
import StreamIntroduction from "../Stream/streamIntroduction"
import MoviesCategories from "./moviesCategories"
import MoviesTop from "./moviesTop"
import MoviesTopCarousel from "./moviesTopCarousel"
import { useEffect, useState } from "react"
import getAllMovie from "@/app/api/movies/getAllMovie"

export default function MoviesIntroduction() {
    const [dataVideos, setDataVideos] = useState([]);

    useEffect(() => {
        getAllMovieData();
    }, []);

    async function getAllMovieData() {
        const response = await getAllMovie();
        const content = response.content;
        setDataVideos(content);
        console.log("test", content);
    };

    return (
        <div className="w-full my-14 p-6 lg:p-16">
            <div className="hidden lg:block">
                <MoviesTopCarousel title="10 bộ phim thịnh hành nhất hiện nay" dataVideos={dataVideos} />
            </div>
            <div className="block lg:hidden overflow-hidden">
                <MoviesTop title="10 bộ phim thịnh hành nhất hiện nay" dataVideos={dataVideos} />
            </div>
            <div className="flex flex-col mx-4 lg:mx-12 my-4 lg:my-28">
                <StreamIntroduction
                    title={<span>Các buổi phát sóng trực tiếp tại <b>Moviersals</b></span>}
                    subtitle={<span>xu hướng</span>}
                />
            </div>
            <div className="flex w-full flex-col items-center my-14">
                <MoviesCategories dataVideos={dataVideos} />
            </div>
        </div>
    )
}