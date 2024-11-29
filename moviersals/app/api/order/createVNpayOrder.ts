import { requestApi } from "@/lib/requestApi";

export default async function createVNPayOrder(request: Object) {
    const url = "/api/protected/order/create/vnpay";
    const param = request;

    return await requestApi(url, param);
}