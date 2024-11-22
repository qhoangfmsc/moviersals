"use client"

import EpisodeListCarousel from "@/components/Episode/episodeListCarousel";
import { MdiEyeOutline } from "@/components/icons";
import MoviesComments from "@/components/Movies/moviesComments";
import MyMoviesComments from "@/components/Movies/moviesMyComments";
import MovieSuggestion from "@/components/Movies/moviesSuggestion";
import { title } from "@/components/primitives";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import { Divider } from "@nextui-org/react";

export default function WatchPage({
    params
}: {
    params: { episodeid: string }
}) {
    return (
        <>
            <CloudinaryVideoPlayer publicIdVP="5second_1_smw5cw" widthVP="100%" heightVP="300" />
            <div className="p-8">
                <div className="leading-10">
                    <h1 className={title()}>Detail movie</h1>
                    <h1 className="text-sm">Nhà sản xuất: <span>Hello World</span></h1>
                    <div className="flex">
                        <div className="self-center">
                            <MdiEyeOutline />
                        </div>
                        <div className="self-center">
                            &nbsp; 3 lượt xem
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap h-5 font-black mt-8 space-x-4">
                    <Divider orientation="vertical" />
                    <h1 className="text-sm">2024</h1>
                    <Divider orientation="vertical" />
                    <h1 className="text-sm">Khoa học viễn tưởng</h1>
                    <Divider orientation="vertical" />
                    <h1 className="text-sm">Phiêu lưu</h1>
                    <Divider orientation="vertical" />
                </div>
                <p className="my-8 text-sm leading-6 lg:w-1/2">
                    Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.
                </p>
                <div className="mt-12 w-full">
                    <h1 className="text-2xl my-4">Danh sách tập</h1>
                    <EpisodeListCarousel movieid={params.episodeid} />
                </div>
                <div className="mt-12 w-full">
                    <h1 className="text-2xl my-4">Đề xuất cho bạn</h1>
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