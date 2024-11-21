import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

interface PaypalProps {
  totalAmount?: number;
}

export default function PaypalButon({ totalAmount }: PaypalProps) {
  //Paypal button
  // const [{ options }, dispatch] = usePayPalScriptReducer();
  // const [{ isPending }] = usePayPalScriptReducer();
  async function createOrder(data, actions) {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: "14.99",
            currency_code: "USD",
          },
        },
      ],
    });
  }
  function onApprove(data) {
    console.log("on approve: ", data);
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_CLIENT_ID, currency: "USD", intent: "capture" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}
