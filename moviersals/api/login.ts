export default async function login(username: string, password: string) {
    const url = "https://moviersals.onrender.com/api/login";
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .catch((response) => {
            console.log(response.status, response.statusText);
            response.json().then((json: any) => {
                console.log(json);
            })
        });
}