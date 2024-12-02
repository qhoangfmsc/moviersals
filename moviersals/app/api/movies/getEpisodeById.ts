import { requestApi } from "@/lib/requestApi";

export default async function getMovieEpisodeById(movieid: string, episodeid: string) {
    const url = `/api/protected/movie/watch/${movieid}/${episodeid}`;

    return await requestApi(url, null);
}