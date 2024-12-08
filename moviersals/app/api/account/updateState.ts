import { requestApi } from "@/lib/requestApi";

export default async function updateState(request : Object) {
  const url = "/api/internal/account/updateState";
  return await requestApi(url, request);

  // return (typeof res?.content == "object") ? res?.content : null;
}
