import { requestApi } from "@/lib/requestApi";

export default async function uploadMovie(request: Object) {
    const url = "/api/internal/movie/edit";
    const param = request;

    return await requestApi(url, param);
}