export default async function requestApi(url: string, param: Object) {
    return fetch(process.env.NEXT_PUBLIC_API_DOMAIN + url,
        {
            method: "POST",
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