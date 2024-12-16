"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface PaymentMethodsComponentUIProps {
  payment: {
    subcriptionid: string;
    usdPrice: string;
    vndPrice: string;
  };
}

export default function PaymentMethodsComponent({ payment }: PaymentMethodsComponentUIProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const milisecondLoad = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, milisecondLoad);

    return () => clearTimeout(milisecondLoad);
  }, []);

  return (
    <div>
      <div
        className="w-full p-8 h-fit flex flex-row items-center gap-4 rounded-lg"
        style={{
          display: isLoading ? "none" : "block",
        }}>
        {payment.usdPrice != null && (
          <PaypalButon
            price={payment.usdPrice}
            subcriptionid={payment.subcriptionid}
          />
        )}
        <VNPayButon
          price={payment.vndPrice}
          subcriptionid={payment.subcriptionid}
        />
      </div>
      {isLoading && (
        <div className="w-full p-8 flex flex-row items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
