import { isHostnameLocal } from "./utils";

export async function requestApi(url: string, param: Object | null | FormData) {
    const hostname = isHostnameLocal()
        ? process.env.NEXT_PUBLIC_API_DOMAIN_LOCALHOST
        : process.env.NEXT_PUBLIC_API_DOMAIN_PRODUCTION;

    return fetch(hostname + url, {
        method: param ? "POST" : "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            ...(param instanceof FormData ? {} : { "Content-Type": "application/json" }),

        },
        body: param instanceof FormData ? param : param ? JSON.stringify(param) : undefined,
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error("API Request Error:", error);
    });
}