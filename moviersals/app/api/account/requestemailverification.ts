import { requestApi } from "@/lib/requestApi";

export default async function RequestEmailVerification(email: string) {
  const url = "/api/protected/account/createEmailVerification";
  const param = {
    email: email,
  };

  return await requestApi(url, param);
}
