import { requestApi } from "@/lib/requestApi";

export default async function getUserSubcriptionPrice(subcriptionid: string) {

    const url = "/api/protected/subcription/getUserPrice/" + subcriptionid;

    return await requestApi(url, null);
}