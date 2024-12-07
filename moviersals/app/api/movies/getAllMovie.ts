import { requestApi } from "@/lib/requestApi";

export default async function getAllMovie(page: number) {
    const url = `/api/movie/getAll?page=${page}`;
    return await requestApi(url, null);
}