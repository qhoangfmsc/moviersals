import { requestApi } from "@/lib/requestApi";

export default async function getAllUser() {
    const url = "/api/internal/account/getAllUser";
    return await requestApi(url, null);
}