import { requestApi } from "@/lib/requestApi";

export default async function testUploadImage(param : Object) {
    const url = "/api/internal/testupload";
    return await requestApi(url, param);
}