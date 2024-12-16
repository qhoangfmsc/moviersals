"use client";
import React, { useEffect, useState } from "react";
import getUSDConversionRate from "@/app/api/conversion/getUSDConversionRate";
import PaymentTotalPrice from "./paymentTotalPrice";
import PaymentTotalUnusePrice from "./paymentTotalUnusedPrice";

interface PaymentDataProps {
  subcriptionid: string;
  price: string;
  newPrice?: string;
}

export default function PaymentBoard({
  paymentData,
  element,
  userData,
}: {
  paymentData: PaymentDataProps;
  element: React.ReactNode;
  userData: any;
}) {
  const [usdPrice, setUSDPrice] = useState<any>(null);

  useEffect(() => {
    if (paymentData?.newPrice) getUSDFromVND();
  }, [paymentData]);

  async function getUSDFromVND() {
    const response = await getUSDConversionRate();
    if (response.result == "success") {
      const rate = response.rates["VND"];
      const usdPrice = (Number(paymentData.newPrice) / rate).toPrecision(3);
      setUSDPrice(usdPrice);
    }
  }

  return (
    <div className="flex justify-center p-4 mx-auto gap-8">
      <div className="border-2 border-[#006fee] rounded-2xl">{element}</div>
      <div className="flex flex-col justify-between w-[380px] max-w-[400px]">
        {paymentData?.newPrice < paymentData?.price && (
          <PaymentTotalUnusePrice
            userData={userData}
            price={paymentData?.price}
            newprice={paymentData?.newPrice}
          />
        )}
        <PaymentTotalPrice payment={{ subcriptionid: paymentData?.subcriptionid, usdPrice: usdPrice, vndPrice: paymentData?.newPrice }} />
        {/* <VNPPaymentWarning /> */}
      </div>
    </div>
  );
}
