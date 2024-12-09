import { requestApi } from "@/lib/requestApi";

export default async function getUserSubcription() {

    const url = "/api/protected/account/getSubcription";

    return await requestApi(url, null);
}