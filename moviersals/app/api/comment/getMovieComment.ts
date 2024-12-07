import { requestApi } from "@/lib/requestApi";

export default async function getMovieComment(movieid: string, userid: string, page: number) {
    const url = `/api/comment/getAll/${movieid}?userid=${userid}&page=${page}`;
    return await requestApi(url, null);
}