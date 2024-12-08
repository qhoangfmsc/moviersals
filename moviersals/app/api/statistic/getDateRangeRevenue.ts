import { requestApi } from "@/lib/requestApi";

export default async function getDateRangeRevenue(request: Object) {

    const url = `/api/internal/statistic/getDateRaneRevenue`;
    return await requestApi(url, request);
}