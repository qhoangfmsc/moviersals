"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import React from "react";

export default function PaylPalTest() {
  const amountToPay = 9.84;
  const subplanid = "PREMIUM_M";

  return (
    <div className="h-80 flex items-center justify-center">
      <PaypalButon
        totalAmount={amountToPay}
        subplanid={subplanid}
      />
    </div>
  );
}
