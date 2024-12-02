import { requestApi } from "@/lib/requestApi";

export default async function getMovieComment(movieid: string, userid: string) {
    const url = "/api/comment/getAll/" + movieid +"?userid=" + userid;
    return await requestApi(url, null);
}