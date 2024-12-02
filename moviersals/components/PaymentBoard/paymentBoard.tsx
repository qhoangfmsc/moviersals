"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import React, { useEffect, useState } from "react";

interface PaymentDataProps {
  subcriptionid: string;
  price: string;
}

interface SelectedSubcriptionUIProps {
  element: React.ReactNode;
}

export default function PaymentBoard({ paymentData, element }: { paymentData: PaymentDataProps; element: React.ReactNode }) {
  const testData = () => {
    console.log("here: ", paymentData.subcriptionid, paymentData.price);
  };

  return (
    <div className="flex items-center justify-center w-5/6 border border-[#262626] rounded-lg p-4 mx-auto">
      <div className="border-2 border-[#006fee] rounded-2xl">{element}</div>
      <Card
        radius="lg"
        className="">
        <div className="w-fit p-8 h-screen flex items-center flex-col gap-4">
          <div className="mb-8">
            <h1 className="text-lg">Hãy chọn phương thức thanh toán</h1>
          </div>
          <PaypalButon
            price={paymentData?.price}
            subcriptionid={paymentData?.subcriptionid}
          />
          <VNPayButon
            price={paymentData?.price}
            subcriptionid={paymentData?.subcriptionid}
          />
          <Button onClick={testData}>Test</Button>
        </div>
      </Card>
    </div>
  );
}
