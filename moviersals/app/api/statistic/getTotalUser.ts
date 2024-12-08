import { requestApi } from "@/lib/requestApi";

export default async function getTotalUse() {
    const url = `/api/internal/statistic/getTotalUser`;
    return await requestApi(url, null);
}