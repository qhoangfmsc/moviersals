import { requestApi } from "@/lib/requestApi";

export default async function editSubscriptionPlan(request: Record<string, any>) {

    const url = "/api/internal/subcription/edit";

    return await requestApi(url, request);
}