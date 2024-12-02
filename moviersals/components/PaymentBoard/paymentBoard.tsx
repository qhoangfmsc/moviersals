"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import { Card } from "@nextui-org/card";
import React, { useEffect, useState } from "react";

interface PaymentDataProps {
  subcriptionid: string;
  amount: number;
}

export default function PaymentBoard({ subcriptionid, amount }: PaymentDataProps) {
  amount = 9.84;
  subcriptionid = "PREMIUM_M";

  return (
    <Card
      radius="lg"
      className="w-fit p-8 h-80 flex items-center flex-col">
      <div>
        <PaypalButon
          amount={amount}
          subcriptionid={subcriptionid}
        />
        <VNPayButon
          amount={amount}
          subcriptionid={subcriptionid}
        />
      </div>
    </Card>
  );
}
