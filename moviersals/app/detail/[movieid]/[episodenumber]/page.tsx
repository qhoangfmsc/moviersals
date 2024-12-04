"use client";

import getMovieComment from "@/app/api/comment/getMovieComment";
import getMovieDetailById from "@/app/api/movies/getMovieById";
import EpisodeListCarousel from "@/components/Episode/episodeListCarousel";
import IsFavouriteSwitch from "@/components/Episode/isFavouriteSwitch";
import { MdiEyeOutline } from "@/components/icons";
import MovieComments from "@/components/Movies/moviesComments";
import MovieMyComment from "@/components/Movies/moviesMyComments";
import MovieSuggestion from "@/components/Movies/moviesSuggestion";
import { title } from "@/components/primitives";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { showResponseToast } from "@/lib/utils";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [movieComment, setMovieComment] = useState({
    myComment: emptyComment,
    movieComments: [],
  });
  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  useEffect(() => {
    fetchMovieInfo();
    fetchMovieComment();
  }, []);

  const fetchMovieInfo = async () => {
    const response = await getMovieDetailById(params.movieid);
    if (response.status == "success") {
      const currentEpisode = response.content.list.find((episode) => episode.episodenumber == params.episodenumber);
      const videoid = currentEpisode?.episodepath?.match(/\/upload\/v\d+\/(.+)/)[1];
      setData((prevData) => ({
        ...prevData,
        ...response.content,
        videoid,
      }));
      console.log("Views: ", response.content.movieDetail);
    } else {
      showResponseToast(response);
    }
  };

  const fetchMovieComment = async () => {
    const response = await getMovieComment(params.movieid, userinfo?.id);
    if (response.status == "success") {
      let myComment = emptyComment;
      if (response.content[0].userid == userinfo?.id) {
        // Reponse always put current userid in first index if exist
        myComment = response.content[0];
        response.content.shift();
      }
      setMovieComment({
        myComment,
        movieComments: response.content,
      });
    } else {
      showResponseToast(response);
    }
  };

  return (
    <>
      <div className="h-[540px] w-[100%] flex items-center justify-center align-middle px-8">
        {data?.movieDetail?.ispremium == true && userinfo?.ispremium != true ? (
          <div className="h-[540px] w-[100%] border rounded-lg border-[#262626] flex items-center justify-center">
            <div className="flex w-fit h-fit flex-col items-center justify-center gap-4 ">
              <h1 className="text-2xl text-center text-center">
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
            {/* {data?.videoid && (
              <CloudinaryVideoPlayer
                publicid={data.videoid}
                movieid={params.movieid}
                episodenumber={params.episodenumber}
              />
            )} */}
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="leading-10 border border-[#262626] rounded-lg p-1 flex flex-row gap-4 items-center">
          {/* <h1 className={title()}>{data?.movieDetail?.name}</h1>
          <h1 className="text-sm">
            Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span>
          </h1> */}
          <div className="">
            <IsFavouriteSwitch />
          </div>
          <div className=" flex">
            <div className="self-center">
              <MdiEyeOutline />
            </div>
            <div className="self-center">&nbsp; {data?.movieDetail?.view >= 0 ? data?.movieDetail?.view : "Chưa có"} lượt xem</div>
          </div>
        </div>
        {/* <div className="flex flex-wrap h-5 font-black mt-8 space-x-4">
          <Divider orientation="vertical" />
          <h1 className="text-sm">{data?.movieDetail?.publishyear}</h1>
          {Array.isArray(data?.movieDetail?.categories)
            ? data?.movieDetail?.categories.map((cat, index) => (
                <div key={index}>
                  <Divider orientation="vertical" />
                  <h1 className="text-sm">
                    <span key={index}>{categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}</span>
                  </h1>
                </div>
              ))
            : JSON.parse(data?.movieDetail?.categories || "[]").map((cat: string, index: number) => (
                <div key={index}>
                  <Divider orientation="vertical" />
                  <h1 className="text-sm">
                    <span key={index}>{categoriesSubtitles[cat as keyof typeof categoriesSubtitles]?.vietsub}</span>
                  </h1>
                </div>
              ))}
        </div> */}
        {/* <p className="my-8 text-sm leading-6 lg:w-1/2">{data?.movieDetail?.description}</p> */}
        {data?.movieDetail?.type == "movie" ? (
          <></>
        ) : (
          <div className="mt-12 w-full">
            <h1 className="text-2xl my-4">Danh sách tập</h1>
            <EpisodeListCarousel movieData={data} />
          </div>
        )}
        <div className="mt-12 w-full">
          <h1 className="text-2xl my-4">Có thể bạn cũng thích</h1>
          <MovieSuggestion />
        </div>
        {movieComment && (
          <div className="mt-12 lg:w-1/2">
            <h1 className="text-2xl my-4">Bình luận</h1>
            <MovieMyComment
              movieid={params.movieid}
              mycomment={movieComment.myComment}
            />
            <MovieComments commentList={movieComment.movieComments} />
          </div>
        )}
      </div>
    </>
  );
}
