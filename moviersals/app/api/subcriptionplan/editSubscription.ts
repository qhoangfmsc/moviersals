import { requestApi } from "@/lib/requestApi";

export default async function editSubscriptionPlan(request: Record<string, any> | FormData) {

    const url = "/api/internal/subcription/edit";

    return await requestApi(url, request);
}