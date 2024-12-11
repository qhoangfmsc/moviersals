import { requestApi } from "@/lib/requestApi";

export default async function getAllUser(page: number) {
    const url = `/api/internal/account/getAllUser?page=${page}`;
    return await requestApi(url, null);
}