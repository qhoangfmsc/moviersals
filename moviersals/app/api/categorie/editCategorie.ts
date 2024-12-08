import { requestApi } from "@/lib/requestApi";

export default async function editCategorie(request: Record<string, any> | FormData) {

    const url = "/api/internal/categorie/edit";

    return await requestApi(url, request);
}