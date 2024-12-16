"use client";
import React from "react";
import { IconDongSign, IconInfoCircle } from "../icons";
import { calculateDaysTo } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";

interface PaymentTotalUnusedPriceUIProps {
  userData: any;
  price: any;
  newprice: any;
}

export default function PaymentTotalUnusePrice({ userData, price, newprice }: PaymentTotalUnusedPriceUIProps) {
  return (
    <div className="p-8 h-full flex flex-col border border-[#262626] rounded-lg">
      <div className="w-full h-full text-center gap-4 rounded-lg">
        <div className="w-full flex flex-row justify-between mb-4">
          <div className="w-fit">Số ngày chưa sử dụng</div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <h1 className="font-bold">{`${calculateDaysTo(userData?.usingend)} ngày`}</h1>
          </div>
        </div>
        {/* <div className="w-full flex flex-row justify-between mb-4">
          <div className="w-fit">Số tiền chưa sử dụng</div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <h1 className="font-bold">{`${(Number(price) - Number(newprice) + 10000).toLocaleString()}`}</h1>
            <IconDongSign />
          </div>
        </div> */}
        <div className="w-full flex flex-row justify-between mb-4">
          <Tooltip
            placement="top-end"
            content="Phí cứng không thay đổi">
            <div className="w-fit flex flex-row gap-2">
              <span>Phí nâng cấp gói </span>
              <IconInfoCircle
                height={"1.4em"}
                width={"1.4em"}
              />
            </div>
          </Tooltip>
          <div className="flex flex-row gap-2 justify-end items-center">
            <h1 className="font-bold">10000</h1>
            <IconDongSign />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-fit">Tổng giảm</div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <h1 className="font-bold">{`${(Number(price) - Number(newprice)).toLocaleString()}`}</h1>
            <IconDongSign />
          </div>
        </div>
      </div>
    </div>
  );
}
