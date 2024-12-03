"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { IconCurrencyUsd, IconDongSign, IconInfoCircle } from "../icons";
import { Divider } from "@nextui-org/react";
import getUSDConversionRate from "@/app/api/conversion/getUSDConversionRate";

interface PaymentDataProps {
  subcriptionid: string;
  price: string;
}

interface SelectedSubcriptionUIProps {
  element: React.ReactNode;
}

export default function PaymentBoard({ paymentData, element }: { paymentData: PaymentDataProps; element: React.ReactNode }) {
  const [usdPrice, setUSDPrice] = useState<any>(null);

  useEffect(() => {
    if (paymentData?.price) getUSDFromVND();
  }, [paymentData]);

  async function getUSDFromVND() {
    const response = await getUSDConversionRate();
    if (response.result == "success") {
      const rate = response.rates["VND"];
      const usdPrice = (Number(paymentData.price) / rate).toPrecision(3);
      setUSDPrice(usdPrice);
    }
  }

  const testData = () => {
    console.log("here: ", paymentData.subcriptionid, paymentData.price, usdPrice);
  };

  return (
    <div className="flex justify-center p-4 mx-auto gap-8">
      <div className="w-[440px] h-fit break-words text-justify border border-[#262626] rounded-lg p-4 mr-20">
        <div className="flex flex-row items-start gap-2">
          <IconInfoCircle />
          <h1 className="text-xl font-bold">Lưu ý</h1>
        </div>
        <Divider className="w-2/6 my-2" />
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
      <div className="border-2 border-[#006fee] rounded-2xl">{element}</div>

      <div className="w-fit p-8 h-fit flex items-center flex-col gap-4  border border-[#262626] rounded-lg p-4">
        {usdPrice != null && (
          <PaypalButon
            price={usdPrice}
            subcriptionid={paymentData?.subcriptionid}
          />
        )}
        <VNPayButon
          price={paymentData?.price}
          subcriptionid={paymentData?.subcriptionid}
        />
        <Button onClick={testData}>Test</Button>
      </div>

      <div className="w-fit p-8 h-fit flex items-center flex-col gap-4  border border-[#262626] rounded-lg p-4">
        {usdPrice != null && (
          <div className="flex flex-row gap-2 w-[100%] justify-start items-center">
            <IconCurrencyUsd />
            <h1 className="text-xl font-bold">{usdPrice}</h1>
          </div>
        )}
        <div className="flex flex-row gap-2 w-[100%] justify-start items-center">
          <IconDongSign />
          <h1 className="text-xl font-bold">{paymentData?.price}</h1>
        </div>
      </div>
    </div>
  );
}
