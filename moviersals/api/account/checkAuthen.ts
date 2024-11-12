import requestApi from "@/lib/requestApi";

export default async function checkAuthen() {
  const url = "/api/protected/checkAuthen";
  return await requestApi(url, null);
}
