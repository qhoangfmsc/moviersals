import { requestApi } from "@/lib/requestApi";

export default async function deleteEpisode(request: Object) {
    const url = "/api/internal/episode/delete";
    const param = request;

    return await requestApi(url, param);
}