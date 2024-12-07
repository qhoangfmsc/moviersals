import { requestApi } from "@/lib/requestApi";

export default async function getCategories() {
    const url = `/api/movie/getCategories`;
    return await requestApi(url, null);
}