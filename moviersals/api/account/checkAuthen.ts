import { requestApi } from "@/lib/requestApi";

export default async function checkAuthen() {
  const url = "/api/protected/checkAuthen";
  const res = await requestApi(url, null);

  return (typeof res?.content == "object") ? res?.content : null;
}
