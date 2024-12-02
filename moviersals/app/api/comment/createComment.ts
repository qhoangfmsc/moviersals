import { requestApi } from "@/lib/requestApi";

export default async function createComment(body: Object) {
    const url = "/api/protected/comment/create";
    return await requestApi(url, body);
}