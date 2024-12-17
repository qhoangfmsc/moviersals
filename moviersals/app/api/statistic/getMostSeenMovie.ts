import { requestApi } from "@/lib/requestApi";

export default async function getMostSeenMovie(param: Object) {
    const url = `/api/internal/statistic/getMostSeen`;
    return await requestApi(url, param);
}