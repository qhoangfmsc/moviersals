import { requestApi } from "@/lib/requestApi";

export default async function getAllMovie() {
    const url = "/api/movie/getAll";
    return await requestApi(url, null);
}