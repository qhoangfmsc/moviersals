import requestApi from "@/lib/requestApi";

export default async function login(username: string, password: string) {
    const url = "/api/login";
    const param = {
        username: username,
        password: password,
    }

    return await requestApi(url, param);
}