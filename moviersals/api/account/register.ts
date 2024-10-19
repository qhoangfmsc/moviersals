import requestApi from "@/lib/requestApi";

export default async function register(username: string, password: string, displayname: string, email: string, phonenumber: string) {
    const url = "/api/create";
    const param = {
        username: username,
        password: password,
        displayname: displayname,
        email: email,
        phonenumber: phonenumber,
    };

    return await requestApi(url, param);
}