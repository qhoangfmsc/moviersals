import { requestApi } from "@/lib/requestApi";

export default async function getTotalUser() {
    const url = `/api/internal/statistic/getTotalUser`;
    return await requestApi(url, null);
}