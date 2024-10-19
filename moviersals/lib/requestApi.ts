export default async function requestApi(url: string, param: Object | null) {
    return fetch(process.env.NEXT_PUBLIC_API_DOMAIN + url,
        {
            method: param ? "POST" : "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        })
        .then((response) => {
            return response.json();
        })
        .catch((response) => {
            console.log(response.status, response.statusText);
            return response.json();
        });
}