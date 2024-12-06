import FallbackDetail from "@/components/Fallback/fallbackDetail";
import VNPayInvoice from "@/components/Invoice/vnpayInvoce";
import { Suspense } from "react";

export default function VnpayInvoicePage() {
  return (
    <Suspense fallback={<FallbackDetail />}>
      <VNPayInvoice />
    </Suspense>
  );
}
