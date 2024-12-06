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

interface episodeInfo {
  movieid: string;
  episodenumber: string;
}

export default function WatchPage({ params }: { params: { movieid: string; episodenumber: string } }) {
  const [data, setData] = useState<any>(null);
  const [userinfo, setUserInfo] = useState<any>(null);
  const [movieComment, setMovieComment] = useState<{
    myComment: Comment | null;
    movieComments: Comment[] | null;
  } | null>(null);

  useEffect(() => {
    const tempUserinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
    setUserInfo(tempUserinfo);
    fetchMovieInfo(tempUserinfo.id);
    fetchMovieComment(tempUserinfo?.id);
  }, [params.movieid, params.episodenumber]);

  const fetchMovieInfo = async (userid: string) => {
    const response = await getMovieDetailById(params.movieid, userid);
    if (response.status == "success") {
      const currentEpisode = response.content.list.find((episode) => episode.episodenumber == params.episodenumber);
      const videoid = currentEpisode?.episodepath?.match(/\/upload\/v\d+\/(.+)/)[1];
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
    const response = await getMovieComment(params.movieid, userid);
    if (response.status == "success") {
      let myComment = emptyComment;
      if (response.content[0].userid == userid) {
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
    <Transition>
      <div className="h-[540px] w-[100%] flex items-center justify-center align-middle px-8 mt-12">
        {data && data?.movieDetail?.ispremium == true && userinfo?.ispremium != true ? (
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
            <div className="self-center">&nbsp; {data?.movieDetail?.view >= 0 ? data?.movieDetail?.view : "Chưa có"} lượt xem</div>
          </div>
        </div>
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
            {userinfo != null && (
              <MovieMyComment
                userinfo={userinfo}
                movieid={params.movieid}
                mycomment={movieComment.myComment}
              />
            )}
            <MovieComments commentList={movieComment.movieComments} />
          </div>
        )}
      </div>
    </Transition>
  );
}
