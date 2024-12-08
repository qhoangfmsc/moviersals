import { requestApi } from "@/lib/requestApi";

export default async function getTotalRevenue() {

    const url = `/api/internal/statistic/getTotalRevenue`;
    return await requestApi(url, null);
}