"use client";
import createPaypalOrder from "@/app/api/order/createPaypalOrder";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalDataProps {
  subcriptionid: string;
  price: string;
}

export default function PaypalButon({ subcriptionid, price }: PaypalDataProps) {
  async function createOrder(data, actions) {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: price,
            currency_code: "USD",
          },
        },
      ],
    });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      console.log("on approve: ", details);
      const request = {
        id: details.id,
        subcriptionid: subcriptionid,
        amount: price,
        payerid: details.payer.payer_id,
        email: details.payer.email_address,
      };
      const result = await createPaypalOrder(request);
      if (result.status === "success") return null;
    });
  }

  return (
    <div
      className="w-[100%]"
      style={{ colorScheme: "none" }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
        <PayPalButtons
          style={{ height: 55, layout: "vertical", color: "gold" }}
          fundingSource="paypal"
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={() => {
            console.log("Canceled!");
          }}
          onError={(err) => {
            console.error("Error:", err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
