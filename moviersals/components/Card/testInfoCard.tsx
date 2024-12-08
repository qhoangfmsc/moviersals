import { Card, Snippet } from "@nextui-org/react";

export default function TestInfoCard() {
  return (
    <Card className="w-1/2 mx-auto flex flex-col gap-4 w-fit p-8 h-[600px] mt-4">
      <div>
        <h1>🧾 Tài khoản Paypal (Test)</h1>
        <div className="flex flex-row mt-4 items-center">
          <p>Email &nbsp;</p>
          <Snippet symbol="">foxtest@paypal.com</Snippet>
        </div>
        <div className="flex flex-row mt-4 items-center">
          <p>Mật khẩu &nbsp;</p>
          <Snippet symbol="">foxtest123</Snippet>
        </div>
      </div>
      <div className="mt-8 mb-2">
        <h1>🧾 Tài khoản VNPay (Test)</h1>
        <div className="flex flex-row mt-4 items-center">
          <p>Số thẻ &nbsp;</p>
          <Snippet symbol="">9704198526191432198</Snippet>
        </div>
        <div className="flex flex-row mt-4 items-center">
          <p>Tên chủ thẻ &nbsp;</p>
          <Snippet symbol="">NGUYEN VAN A</Snippet>
        </div>
        <div className="flex flex-row mt-4 items-center">
          <p>Ngày phát hành &nbsp;</p>
          <Snippet symbol="">07/15</Snippet>
        </div>
        <div className="flex flex-row mt-4 items-center">
          <p>OTP &nbsp;</p>
          <Snippet symbol="">123456</Snippet>
        </div>
      </div>
    </Card>
  );
}
