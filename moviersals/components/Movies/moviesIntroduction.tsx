"use client"

import StreamIntroduction from "../Stream/streamIntroduction"
import MoviesCategories from "./moviesCategories"
import MoviesTop from "./moviesTop"
import MoviesTopCarousel from "./moviesTopCarousel"

export default function MoviesIntroduction() {
    return (
        <div className="w-full my-14 p-6 lg:p-16">
            <div className="hidden lg:block">
                <MoviesTopCarousel title="10 bộ phim thịnh hành nhất hiện nay" />
            </div>
            <div className="block lg:hidden overflow-hidden">
                <MoviesTop title="10 bộ phim thịnh hành nhất hiện nay" />
            </div>
            <div className="flex flex-col mx-4 lg:mx-12 my-4 lg:my-28">
                <StreamIntroduction
                    title={<span>Các buổi phát sóng trực tiếp tại <b>Moviersals</b></span>}
                    subtitle={<span>xu hướng</span>}
                />
            </div>
            <div className="flex w-full flex-col items-center my-14">
                <MoviesCategories />
            </div>
        </div>
    )
}