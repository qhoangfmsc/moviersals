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
            console.log("1");
            return response.json();
        })
        .catch((response) => {
            console.log("2");
            console.log(response.status, response.statusText);
            return response.json();
        });
}