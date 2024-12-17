"use client";

import getMovieComment from "@/app/api/comment/getMovieComment";
import getMovieDetailById from "@/app/api/movies/getMovieById";
import EpisodeListCarousel from "@/components/Episode/episodeListCarousel";
import IsFavouriteSwitch from "@/components/Button/isFavouriteSwitchButton";
import { MdiEyeOutline } from "@/components/icons";
import Transition from "@/components/MotionFramer/transition";
import MovieComments from "@/components/Movies/moviesComments";
import MovieMyComment from "@/components/Movies/moviesMyComments";
import MovieSuggestion from "@/components/Movies/moviesSuggestion";
import { showResponseToast } from "@/lib/utils";
import { Button, Divider, Pagination } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import "next-cloudinary/dist/cld-video-player.css";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { title } from "@/components/primitives";

interface Comment {
  id: number;
  userid: string;
  movieid: string;
  username: string;
  displayname: string;
  content: string;
  rating: number;
  createddate: string;
  modifieddate: string;
  thumbnail: string;
}

const emptyComment: Comment = {
  id: null,
  userid: null,
  movieid: null,
  username: null,
  displayname: null,
  content: null,
  rating: 0,
  createddate: null,
  modifieddate: null,
  thumbnail: null,
};

export default function WatchPage({ params }: { params: { movieid: string; episodenumber: string } }) {
  const [data, setData] = useState<any>(null);
  const [userinfo, setUserInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();

  const [movieComment, setMovieComment] = useState<{
    myComment: Comment | null;
    movieComments: Comment[] | null;
    total: number;
  } | null>(null);

  useEffect(() => {
    const tempUserinfo = JSON.parse(localStorage.getItem("userinfo")) || null;
    if (userinfo == null) setUserInfo(tempUserinfo);
    if (data == null) fetchMovieInfo(tempUserinfo?.id);
    fetchMovieComment(tempUserinfo?.id);
  }, [currentPage, data, userinfo]);

  const fetchMovieInfo = async (userid: string) => {
    const response = await getMovieDetailById(params.movieid, userid);
    if (response?.status == "success") {
      const currentEpisode = response.content.list.find((episode) => episode.episodenumber == params.episodenumber);
      const videoid = currentEpisode?.episodepath?.match(/\/upload\/v\d+\/(.+)/)[1].split(".")[0];
      const updatedContent = {
        ...response.content,
        current: currentEpisode,
        videoid,
      };
      setData((prevData) => ({
        ...prevData,
        ...updatedContent,
      }));
    } else {
      showResponseToast(response);
    }
  };

  const fetchMovieComment = async (userid: string) => {
    const response = await getMovieComment(params.movieid, userid, currentPage);
    if (response?.status == "success") {
      let myComment = emptyComment;
      if (response.content?.list != null && response.content?.list[0].userid == userid) {
        // Reponse always put current userid in first index if exist
        myComment = response.content.list[0];
        response.content.list.shift();
      }
      setMovieComment({
        myComment,
        movieComments: response.content.list,
        total: response.content.total,
      });
    } else {
      showResponseToast(response);
    }
  };

  function handleDirectLogin() {
    let returnUrl = `/login?next=${pathname}`;
    router.push(returnUrl);
  }

  return (
    <Transition>
      <Script
        async
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
      />
      <div className="px-8 mt-12">
        {userinfo != null ? (
          data && data?.movieDetail?.ispremium == true && userinfo?.ispremium != true ? (
            <div className="h-[540px] w-[100%] flex items-center justify-center align-middle border rounded-lg border-[#262626]">
              <div className="flex w-fit h-fit flex-col items-center justify-center gap-4 ">
                <h1 className="text-2xl text-center">
                  Phim này chỉ dành cho gói người đăng ký <br /> Hãy đăng ký ngay để trải nghiệm
                </h1>
                <Button
                  size="lg"
                  color="primary"
                  as={Link}
                  href="/subscription">
                  Mua ngay
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {data?.videoid && (
                <CloudinaryVideoPlayer
                  publicid={data.videoid}
                  movieid={params.movieid}
                  episodenumber={params.episodenumber}
                  userinfo={userinfo}
                />
              )}
            </div>
          )
        ) : (
          <div className="h-[540px] w-[100%] flex items-center justify-center align-middle border rounded-lg border-[#262626]">
            <div className="flex w-fit h-fit flex-col items-center justify-center gap-4 ">
              <h1 className="text-2xl text-center">Hãy đăng nhập để trải nghiệm</h1>
              <Button
                size="lg"
                color="primary"
                onClick={handleDirectLogin}>
                Đi đến đăng nhập
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="leading-10 border border-[#262626] rounded-lg p-1 flex flex-row gap-4 items-center">
          <div className="">
            <IsFavouriteSwitch
              isFav={data?.current?.isfavourite}
              data={{
                movieid: params.movieid,
                episodenumber: params.episodenumber,
              }}
            />
          </div>
          <div className=" flex">
            <div className="self-center">
              <MdiEyeOutline />
            </div>
            <div className="self-center">
              &nbsp;{" "}
              {data?.list[Number(params.episodenumber) - 1]?.view >= 0 ? data?.list[Number(params.episodenumber) - 1]?.view : "Chưa có"}{" "}
              lượt xem
            </div>
          </div>
        </div>
        <div className="my-4">
          {
            data?.movieDetail?.type != "movie" && (
              <h1 className="text-xl mb-4">
                Tập {params?.episodenumber}: {data?.current?.name}
              </h1>
            )
          }
          <h1 className={title()}>{data?.movieDetail?.name}</h1>
          <h1 className="text-sm text-gray-400 mt-2">
            Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span>
          </h1>
          <div className="flex flex-wrap h-5 font-black mt-8 space-x-8">
            <Divider orientation="vertical" />
            <h1 className="text-sm">{data?.movieDetail?.publishyear}</h1>
            <Divider orientation="vertical" />
            {Array.isArray(data?.movieDetail?.categoriesvi)
              ? data?.movieDetail?.categoriesvi.map(
                (cat, index) =>
                  cat && (
                    <div key={index}>
                      <div className="text-sm">{cat}</div>
                    </div>
                  )
              )
              : JSON.parse(data?.movieDetail?.categoriesvi || "[]").map(
                (cat: string, index: number) =>
                  cat && (
                    <div key={index}>
                      <div className="text-sm">{cat}</div>
                    </div>
                  )
              )}
            <Divider orientation="vertical" />
          </div>
          <p className="my-4 text-gray-400">{data?.movieDetail?.description}</p>
        </div>
        {data?.movieDetail?.type == "movie" ? (
          <></>
        ) : (
          <div className="mt-12 w-full">
            <h1 className="text-2xl my-4">Danh sách tập</h1>
            <EpisodeListCarousel movieData={data} />
          </div>
        )}
        <div className="mt-20 w-full">
          <h1 className="text-2xl my-4">Có thể bạn cũng thích</h1>
          <MovieSuggestion />
        </div>
        {movieComment && (
          <div className="mt-12 lg:w-1/2">
            <h1 className="text-2xl my-4">Bình luận</h1>
            {userinfo != null && (
              <MovieMyComment
                userinfo={userinfo}
                movieid={params.movieid}
                mycomment={movieComment.myComment}
              />
            )}
            <MovieComments commentList={movieComment.movieComments} />
            {movieComment && movieComment?.total > 1 && (
              <Pagination
                className="w-fit mt-4 mx-auto"
                total={movieComment?.total}
                page={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </Transition>
  );
}
