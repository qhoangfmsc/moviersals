"use client";

import createVNPayOrder from "@/app/api/order/createVNpayOrder";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface PaypalDataProps {
  subcriptionid: string;
  amount: number;
}

export default function VNPayButon({ subcriptionid, amount }: PaypalDataProps) {
  const [popup, setPopup] = useState(null);

  async function handleVNPayClick() {
    const body = { subcriptionid: subcriptionid, amount: amount };

    const result = await createVNPayOrder(body);
    if (result.status == "success") {
      const url = result.content;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        const windowFeatures = "width=800,height=1200,left=600,top=200";
        const newPopup = window.open(result.content, "_blank", windowFeatures);
        setPopup(newPopup);

        // Auto-close the pop-up after 5 seconds
        const timeoutId = setTimeout(() => {
          if (newPopup && !newPopup.closed) {
            newPopup.close();
          }
        }, 5000); // Auto-close after 5 seconds

        // Check the pop-up URL every second
        const intervalId = setInterval(() => {
          if (newPopup && !newPopup.closed) {
            const currentUrl = newPopup.location.href;

            // Replace 'https://example.com' with the URL you want to match
            if (currentUrl.includes("/vnpay/return")) {
              clearTimeout(timeoutId); // Stop auto-closing if condition is met
              newPopup.close(); // Close the pop-up as the URL matches the condition
              clearInterval(intervalId); // Stop checking the URL
            }
          }
        }, 1000); // Check every second
      }
    } else {
      console.log("VNPay error!");
    }
  }

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
          backgroundColor: "#003366",
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: "2px 26px",
          borderRadius: "8px",
        }}
        onClick={handleVNPayClick}>
        VNPay
      </Button>
    </div>
  );
}
