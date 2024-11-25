import { requestApi } from "@/lib/requestApi";

export default async function editProfile(request: FormData) {
    const url = "/api/protected/account/edit";
    return await requestApi(url, request);
}
