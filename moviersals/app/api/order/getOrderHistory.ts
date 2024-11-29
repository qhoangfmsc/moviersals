import { requestApi } from "@/lib/requestApi";

export default async function getOrderHistory(page: string) {

    const url = "/api/protected/order/history?page=" + page;

    return await requestApi(url, null);
}