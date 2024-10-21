import requestApi from "@/lib/requestApi";

export default async function RequestPasswordRecovery(email: string) {
  const url = "/api/createResetPasswordToken";
  const param = {
    email: email,
  };

  return await requestApi(url, param);
}
