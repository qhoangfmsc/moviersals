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
  const [orderId, setOrderId] = useState<string>("");
  const router = useRouter();
  function createOrder() {
    console.log("create amount: ", totalAmount);
    return null;
  }
  function onApprove(data) {
    console.log("on approve: ", data);
    return null;
  }

  return (
    <PayPalScriptProvider options={{ clientId: "test", currency: "VND", intent: "capture" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}
