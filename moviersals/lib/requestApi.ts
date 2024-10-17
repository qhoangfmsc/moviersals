export default async function requestApi(url: string, param: Object) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    return fetch(url, {
        method: "POST",
        headers,
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