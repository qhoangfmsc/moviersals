"use client";

import createVNPayOrder from "@/app/api/order/createVNpayOrder";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface PaypalDataProps {
  subcriptionid: string;
  price: string;
}

export default function VNPayButon({ subcriptionid, price }: PaypalDataProps) {
  async function handleVNPayClick() {
    const body = { subcriptionid: subcriptionid, amount: price };

    const result = await createVNPayOrder(body);
    if (result.status == "success") {
      const url = result.content;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.open(url, "_blank");
      }
    } else {
      console.log("VNPay error!");
    }
  }

  return (
    <div className="w-full">
      <Button
        startContent={
          <img
            alt="VNPay logo"
            width={30}
            height={30}
            src="/image/vnpaylogo.png"
          />
        }
        style={{
          backgroundColor: "#003366",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: "2px 26px",
          borderRadius: "5px",
          width: "100%",
          height: "55px",
        }}
        onClick={handleVNPayClick}>
        VNPay
      </Button>
    </div>
  );
}
