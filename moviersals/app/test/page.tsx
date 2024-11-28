"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import React from "react";

export default function PaymentMethodsComponent() {
  const amountToPay = 9.84;
  const subplanid = "PREMIUM_M";

  return (
    <div className="h-80 flex items-center flex-col">
      <PaypalButon
        totalAmount={amountToPay}
        subplanid={subplanid}
      />
      <VNPayButon
        totalAmount={amountToPay}
        subplanid={subplanid}
      />
    </div>
  );
}
