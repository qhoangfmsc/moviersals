import { requestApi } from "@/lib/requestApi";

export default async function uploadMovie(request: Object) {
    const url = "/api/internal/movie/upload";
    const param = request;

    return await requestApi(url, param);
}