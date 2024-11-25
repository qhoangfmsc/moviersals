import { requestApi } from "@/lib/requestApi";

export default async function CheckPasswordRecovery(passwordtoken: string) {
  const url = "/api/checkResetPasswordToken";
  const param = {
    passwordtoken: passwordtoken,
  };

  return await requestApi(url, param);
}
