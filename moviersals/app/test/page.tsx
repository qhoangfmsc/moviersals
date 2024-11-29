"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import React from "react";

export default function PaymentMethodsComponent() {
  const amountToPay = 9.84;
  const subcriptionid = "PREMIUM_M";

  return (
    <div className="h-80 flex items-center flex-col">
      <PaypalButon
        amount={amountToPay}
        subcriptionid={subcriptionid}
      />
      <VNPayButon
        amount={amountToPay}
        subcriptionid={subcriptionid}
      />
    </div>
  );
}
