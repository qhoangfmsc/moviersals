"use client";

import { Button } from "@nextui-org/button";

interface PaypalDataProps {
  subplanid: string;
  totalAmount: number;
}

export default function VNPayButon({ subplanid, totalAmount }: PaypalDataProps) {
  return (
    <div
      className="w-fit h-fit"
      style={{ colorScheme: "none" }}>
      <Button
        size="lg"
        startContent={
          <img
            alt="VNPay logo"
            width={30}
            height={30}
            src="/image/vnpaylogo.png"
          />
        }
        style={{
          backgroundColor: "#003366", // VNPay's brand color
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: "2px 26px",
          borderRadius: "8px",
        }}
        onClick={() => {
          console.log("VNPay button clicked");
        }}>
        VNPay
      </Button>
    </div>
  );
}
