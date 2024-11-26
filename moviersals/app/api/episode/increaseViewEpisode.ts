import { requestApi } from "@/lib/requestApi";

export default async function increaseViewEpisode(request: Object) {
    const url = "/api/protected/episode/increaseview";
    const param = request;

    return await requestApi(url, param);
}