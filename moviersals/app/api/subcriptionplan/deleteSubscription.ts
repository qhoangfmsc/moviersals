import { requestApi } from "@/lib/requestApi";

export default async function deleteSubscriptionPlan(request: Record<string, any> | FormData) {

    const url = "/api/internal/subcription/delete";

    return await requestApi(url, request);
}