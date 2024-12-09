import { requestApi } from "@/lib/requestApi";

export default async function getOtherStatistic() {

    const url = `/api/internal/statistic/getOther`;
    return await requestApi(url, null);
}