import { requestApi } from "@/lib/requestApi";

export default async function getAllSubcriptionPlan() {

    const url = "/api/subcription/getAll";

    return await requestApi(url, null);
}