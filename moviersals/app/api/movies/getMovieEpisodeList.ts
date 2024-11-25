import { requestApi } from "@/lib/requestApi";

export default async function getAllMovie(movieid) {
    const url = "/api/internal/movie/get/" + movieid;
    return await requestApi(url, null);
}