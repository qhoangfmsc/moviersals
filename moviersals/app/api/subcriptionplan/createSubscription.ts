import { requestApi } from "@/lib/requestApi";

export default async function createSubscriptionPlan(request: Record<string, any>) {

    const url = "/api/internal/subcription/create";

    return await requestApi(url, request);
}