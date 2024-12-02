"use client";

import getMovieComment from "@/app/api/comment/getMovieComment";
import getMovieEpisodeById from "@/app/api/movies/getEpisodeById";
import getMovieDetailById from "@/app/api/movies/getMovieById";
import EpisodeListCarousel from "@/components/Episode/episodeListCarousel";
import { MdiEyeOutline } from "@/components/icons";
import MovieComments from "@/components/Movies/moviesComments";
import MovieMyComment from "@/components/Movies/moviesMyComments";
import MovieSuggestion from "@/components/Movies/moviesSuggestion";
import { title } from "@/components/primitives";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import { categoriesSubtitles } from "@/config/categoriesSubtitles";
import { showResponseToast } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { useParams } from "next/navigation";
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

export default function WatchPage({ params }: { params: { movieid: string; episodeid: string } }) {
  //   const { movieid, episodeid } = useParams();
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
      const currentEpisode = response.content.list.find((episode) => episode.episodenumber == params.episodeid);
      const videoid = currentEpisode?.episodepath?.match(/\/upload\/v\d+\/(.+)/)[1];
      setData((prevData) => ({
        ...prevData,
        ...response.content,
        videoid,
      }));
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
      {/* {data?.videoid ? (
        <CloudinaryVideoPlayer
          publicid={data.videoid}
          movieid={params.movieid}
          episodeid={params.episodeid}
          widthVP="100%"
          heightVP="300"
        />
      ) : (
        <h1 className="text-2xl">Loading video...</h1> // Show loading message if episode data is not available
      )} */}
      <div className="p-8">
        <div className="leading-10">
          <h1 className={title()}>{data?.movieDetail?.name}</h1>
          <h1 className="text-sm">
            Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span>
          </h1>
          <div className="flex">
            <div className="self-center">
              <MdiEyeOutline />
            </div>
            <div className="self-center">&nbsp; {data?.movieDetail?.views >= 0 ? data?.movieDetail?.views : "Chưa có"} lượt xem</div>
          </div>
        </div>
        <div className="flex flex-wrap h-5 font-black mt-8 space-x-4">
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
        </div>
        <p className="my-8 text-sm leading-6 lg:w-1/2">{data?.movieDetail?.description}</p>
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
