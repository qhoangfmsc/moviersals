import { requestApi } from "@/lib/requestApi";

export default async function deleteCategorie(request: Record<string, any> | FormData) {

    const url = "/api/internal/categorie/delete";

    return await requestApi(url, request);
}