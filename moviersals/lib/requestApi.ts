import { convertFormDataToJson, convertRequestToFormData } from "./utils";

// In-memory cache object
const apiCache = new Map();
const requiredKeys = ["thumbnail", "video"];

export async function requestCacheApi(url: string, param: Object | null | FormData) {
    const cacheTTL = 43200; // cache 12hours
    const cacheKey = `${url}-${param ? JSON.stringify(param) : "no-params"}`;
    const currentTime = Date.now();

    // Check cache
    if (apiCache.has(cacheKey)) {
        const cachedEntry = apiCache.get(cacheKey);
        if (cachedEntry.expiry > currentTime) {
            console.log("Returning cached response for:", cacheKey);
            return cachedEntry.data;
        } else {
            console.log("Cache expired for:", cacheKey);
            apiCache.delete(cacheKey);
        }
    }
    // Call requestApi if cache is not valid
    const data = await requestApi(url, param);
    // Store the response in cache with expiry
    apiCache.set(cacheKey, {
        data,
        expiry: currentTime + cacheTTL * 1000, // Convert TTL to milliseconds
    });

    return data;
}

export async function requestApi(url: string, param: Object | null | FormData) {
    const hostname = process.env.NEXT_PUBLIC_API_DOMAIN;
    param = convertParamBasedOnRequiredKeys(param);

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

export function convertParamBasedOnRequiredKeys(param: Object | null | FormData) {
    if(param)
        {
            if (param instanceof FormData) {
                const hasAnyRequiredKey = requiredKeys.some((key) => param.has(key));
                if (!hasAnyRequiredKey) {
                    return convertFormDataToJson(param);
                }
            } else if (typeof param === "object") {
                const hasAnyRequiredKey = requiredKeys.some((key) => key in param);
                if (hasAnyRequiredKey) {
                    // Convert Object to FormData
                    return convertRequestToFormData(param);
                }
            }
        }
    return param;
}