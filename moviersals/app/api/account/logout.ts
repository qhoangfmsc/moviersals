import { requestApi } from "@/lib/requestApi";

export default async function logout() {
    const url = "/api/protected/account/logout";
    const param = {};
    return await requestApi(url, param);
}