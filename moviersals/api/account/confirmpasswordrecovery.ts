import requestApi from "@/lib/requestApi";

export default async function ConfirmPasswordRecovery(newpassword: string, passwordtoken: string) {
  const url = "/api/confirmResetPassword";
  const param = {
    newpassword: newpassword,
    passwordtoken: passwordtoken,
  };

  return await requestApi(url, param);
}
