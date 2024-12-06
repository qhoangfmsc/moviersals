import { requestApi } from "@/lib/requestApi";

export default async function addFavouriteEpisode(request: Object) {
    const url = "/api/protected/favourite/add";
    const param = request;

    return await requestApi(url, param);
}