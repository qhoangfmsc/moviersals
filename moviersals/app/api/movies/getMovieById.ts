import { requestApi } from "@/lib/requestApi";

export default async function getMovieDetailById(movieid: string, userid: string) {
    const url = `/api/movie/detail/${movieid}?userid=${userid}`;
    const param = null;

    return await requestApi(url, param);
}