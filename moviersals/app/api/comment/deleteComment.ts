import { requestApi } from "@/lib/requestApi";

export default async function deleteComment(body: Object) {
    const url = "/api/protected/comment/delete";
    return await requestApi(url, body);
}