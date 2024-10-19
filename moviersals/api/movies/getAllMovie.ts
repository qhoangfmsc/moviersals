import requestApi from "@/lib/requestApi";

export default async function getAllMovie() {
    const url = "/api/movie/getAll";
    const param = null

    return await requestApi(url, param);
}