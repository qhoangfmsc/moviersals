import { requestApi } from "@/lib/requestApi";

export default async function getUserFavouriteList(page:number) {
    const url = `/api/protected/favourite/get?page=${page}`;
    return await requestApi(url, null);
}