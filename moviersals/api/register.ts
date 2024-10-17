export default async function register(username: string, password: string, displayname: string, email: string, phonenumber: string) {
    const url = "https://moviersals.onrender.com/api/create";
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    
    return fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            username: username,
            password: password,
            displayname: displayname,
            email: email,
            phonenumber: phonenumber,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((response) => {
            console.log(response.status, response.statusText);
            return response.json();
        });
}