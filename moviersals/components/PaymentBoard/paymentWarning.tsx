"use client";
import React from "react";
import { Divider } from "@nextui-org/react";
import { IconInfoCircle } from "../icons";

export default function VNPPaymentWarning() {
  return (
    <div className="h-fit w-full break-words text-justify border border-[#262626] rounded-lg p-4 mr-20">
      <div className="flex flex-row items-start gap-2">
        <IconInfoCircle />
        <h1 className="text-xl font-bold">Lưu ý</h1>
      </div>
      <Divider className="my-2" />
      <h1 className="text-md text-[#ffffffe0] word-break">
        Khi đang trong quá trình thanh toán bằng VNPAY, nếu quý khách vô tình tắt cửa sổ khi chưa hoàn thành thanh toán, vui lòng truy cập
        <a
          href="/order/history"
          className="text-blue-500">
          &nbsp;Lịch sử mua hàng&nbsp;
        </a>
        và ấn vào đường dẫn của đơn hàng VNPAY được tạo gần đây nhất.
      </h1>
    </div>
  );
}
