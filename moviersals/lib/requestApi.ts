import { convertFormDataToJson } from "./utils";


export async function requestApi(url: string, param: Object | null | FormData) {
    const hostname =  process.env.NEXT_PUBLIC_API_DOMAIN;

    const requiredKeys = ["thumbnail", "video"];

    // Check if `param` is FormData and missing required keys
    if (param instanceof FormData) {
        const tempparam = param as FormData;
        const hasRequiredKeys = requiredKeys.every((key) => tempparam.has(key as string));

        if (!hasRequiredKeys) {
            param = convertFormDataToJson(param); 
        }
    }

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