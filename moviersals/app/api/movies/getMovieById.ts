import { requestApi } from "@/lib/requestApi";

export default async function getMovieDetailById(movieid: string) {
    const url = `/api/movie/detail/${movieid}`;
    const param = null;

    return await requestApi(url, param);
}