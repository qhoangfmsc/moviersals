"use client";
import createPaypalOrder from "@/app/api/order/createPaypalOrder";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface PaypalDataProps {
  subplanid: string;
  totalAmount: number;
}

export default function PaypalButon({ subplanid, totalAmount }: PaypalDataProps) {
  //Paypal button
  // const [{ options }, dispatch] = usePayPalScriptReducer();
  // const [{ isPending }] = usePayPalScriptReducer();
  async function createOrder(data, actions) {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: totalAmount,
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
        subplanid: subplanid,
        amount: totalAmount,
        payerid: details.payer.payer_id,
        email: details.payer.email_address,
      };
      const result = await createPaypalOrder(request);
      if (result.status == "success" && result.status == "success") return null;
    });
  }

  return (
    <div
      className="w-fit h-fit"
      style={{ colorScheme: "none" }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
        <PayPalButtons
          style={{ height: 40, layout: "vertical", color: "gold" }}
          fundingSource="paypal"
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={() => {
            console.log("Canceled !");
          }}
          onError={(err) => {}}
        />
      </PayPalScriptProvider>
    </div>
  );
}
