import { requestApi } from "@/lib/requestApi";

export default async function uploadEpisode(movieid: string, episodename: string, episodepath: string, episodenumber: string) {
    const url = "/api/internal/episode/upload";
    const param = {
        movieid: movieid,
        name: episodename,
        episodepath: episodepath,
        episodenumber: episodenumber,
    };
    return await requestApi(url, param);
}