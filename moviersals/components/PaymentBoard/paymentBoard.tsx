"use client";
import React, { useEffect, useState } from "react";
import getUSDConversionRate from "@/app/api/conversion/getUSDConversionRate";
import VNPPaymentWarning from "./paymentWarning";
import PaymentTotalPrice from "./paymentTotalPrice";

interface PaymentDataProps {
  subcriptionid: string;
  price: string;
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

  return (
    <div className="flex justify-center p-4 mx-auto gap-8">
      <div className="border-2 border-[#006fee] rounded-2xl">{element}</div>
      <div className="flex flex-col justify-between max-w-[440px]">
        <PaymentTotalPrice payment={{ subcriptionid: paymentData?.subcriptionid, usdPrice: usdPrice, vndPrice: paymentData?.price }} />
        {/* <VNPPaymentWarning /> */}
      </div>
    </div>
  );
}
