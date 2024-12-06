import { requestApi } from "@/lib/requestApi";

export default async function removeFavouriteEpisode(request: Object) {
    const url = "/api/protected/favourite/delete";
    const param = request;

    return await requestApi(url, param);
}