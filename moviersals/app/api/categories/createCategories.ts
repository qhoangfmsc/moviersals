import { requestApi } from "@/lib/requestApi";

export default async function createCategorie(request: Record<string, any>) {

    const url = "/api/internal/categorie/create";

    return await requestApi(url, request);
}