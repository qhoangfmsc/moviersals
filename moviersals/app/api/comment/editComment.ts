import { requestApi } from "@/lib/requestApi";

export default async function editComment(body: Object) {
    const url = "/api/protected/comment/edit";
    return await requestApi(url, body);
}