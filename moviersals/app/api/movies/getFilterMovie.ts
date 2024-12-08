import { requestApi } from "@/lib/requestApi";

export default async function getFilterMovie(request: Object) {
    const url = `/api/protected/movie/filter`;
    return await requestApi(url, request);
}