import { requestApi } from "@/lib/requestApi";

export default async function logout() {
    const url = "/api/protected/account/logout";
    return await requestApi(url, null);
}