export async function requestApi(url: string, param: Object | null | FormData) {
    function getHostname(): string {
        const hostname = window.location.hostname;
        return (hostname === 'localhost')
            ? process.env.NEXT_PUBLIC_API_DOMAIN_LOCALHOST
            : process.env.NEXT_PUBLIC_API_DOMAIN_PRODUCTION;
    }

    return fetch(getHostname() + url, {
        method: param ? "POST" : "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: param instanceof FormData ? param : param ? JSON.stringify(param) : undefined,
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error("API Request Error:", error);
    });
}