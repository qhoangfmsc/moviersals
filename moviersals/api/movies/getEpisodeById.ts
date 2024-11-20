import { requestApi } from "@/lib/requestApi";

export default async function getMovieById(movieid: string, episodeid: string) {
    const url = `/api/movie/detail/${movieid}/${episodeid}`;
    const param = null

    return await requestApi(url, param);
}