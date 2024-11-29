import { requestApi } from "@/lib/requestApi";

export default async function ConfirmEmailVerification(email: string, emailtoken: string) {
  const url = "/api/protected/account/verifyEmail";
  const param = {
    email: email,
    emailtoken: emailtoken,
  };

  return await requestApi(url, param);
}
