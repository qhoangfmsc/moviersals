import { requestApi } from "@/lib/requestApi";

export default async function getAllCategories(page: number) {

    const url = `/api/categorie/getAll?page=${page}`;

    return await requestApi(url, null);
}