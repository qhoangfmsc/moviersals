export default async function requestApi(url: string, param: Object | null) {
    function getHostname(): string {
        const hostname = window.location.hostname;
        return (hostname === 'localhost')
            ? process.env.NEXT_PUBLIC_API_DOMAIN_LOCALHOST
            : process.env.NEXT_PUBLIC_API_DOMAIN_PRODUCTION;
    }

    return fetch(getHostname() + url, {
        method: param ? "POST" : "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    }).then((response) => {
        return response.json();
    }).catch((response) => {
        return response.json();
    });
}