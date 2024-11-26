"use client"

import getMovieDetailById from "@/app/api/movies/getMovieById";
import EpisodeListCarousel from "@/components/Episode/episodeListCarousel";
import { MdiEyeOutline } from "@/components/icons";
import MoviesComments from "@/components/Movies/moviesComments";
import MyMoviesComments from "@/components/Movies/moviesMyComments";
import MovieSuggestion from "@/components/Movies/moviesSuggestion";
import { title } from "@/components/primitives";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { Divider } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WatchPage({
    params
}: {
    params: { episodeid: string }
}) {
    const { movieid, episodeid } = useParams();
    const [data, setData] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getMovieDetailById(movieid as string);
        const content = response.content;
        console.log(content);
        setData(content);
    };

    return (
        <>
            <CloudinaryVideoPlayer srcVP={`${movieid}/${episodeid}`} widthVP="100%" heightVP="300" />
            <div className="p-8">
                <div className="leading-10">
                    <h1 className={title()}>{data?.movieDetail?.name}</h1>
                    <h1 className="text-sm">Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span></h1>
                    <div className="flex">
                        <div className="self-center">
                            <MdiEyeOutline />
                        </div>
                        <div className="self-center">
                            &nbsp; {(data?.movieDetail?.views >= 0) ? data?.movieDetail?.views : "Chưa có"} lượt xem
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap h-5 font-black mt-8 space-x-4">
                    <Divider orientation="vertical" />
                    <h1 className="text-sm">{data?.movieDetail?.publishyear}</h1>
                    {Array.isArray(data?.movieDetail?.categories) ? (
                        data?.movieDetail?.categories.map((cat, index) => (
                            <div key={index}>
                                <Divider orientation="vertical" />
                                <h1 className="text-sm">
                                    <span key={index}>
                                        {categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}
                                    </span></h1>
                            </div>
                        ))
                    ) : (
                        JSON.parse(data?.movieDetail?.categories || "[]").map((cat: string, index: number) => (
                            <>
                                <Divider orientation="vertical" />
                                <h1 className="text-sm">
                                    <span key={index}>
                                        {categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}
                                    </span></h1>
                            </>
                        ))
                    )}
                </div>
                <p className="my-8 text-sm leading-6 lg:w-1/2">
                    {data?.movieDetail?.description}
                </p>
                {
                    (data?.movieDetail?.type == "movie")
                        ? <></>
                        : (
                            <div className="mt-12 w-full">
                                <h1 className="text-2xl my-4">Danh sách tập</h1>
                                <EpisodeListCarousel movieData={data} />
                            </div>
                        )
                }
                <div className="mt-12 w-full">
                    <h1 className="text-2xl my-4">Có thể bạn cũng thích</h1>
                    <MovieSuggestion />
                </div>
                <div className="mt-12 lg:w-1/2">
                    <h1 className="text-2xl my-4">Bình luận</h1>
                    <MyMoviesComments />
                    <MoviesComments movieid={params.episodeid} />
                </div>
            </div>
        </>
    );
}