"use client";

import PaymentBoard from "@/components/PaymentBoard/paymentBoard";
import React, { useEffect, useState } from "react";
import getAllSubcriptionPlan from "../api/subcriptionplan/getOrderHistory";
import { showResponseToast } from "@/lib/utils";
import SubcriptionPlanCard from "@/components/Card/subcriptionCard";

export default function PaymentMethodsComponent() {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    async function getAllSubcriptionPlanData() {
      const response = await getAllSubcriptionPlan();
      if (response.status == "success") {
        setData(response.content);
      } else showResponseToast(response);
    }

    getAllSubcriptionPlanData();
  }, []);

  return (
    <div>
      <div className="mt-12 flex flex-row flex-wrap gap-12 justify-center">
        {data.map((item, index) => (
          <div key={index}>
            <SubcriptionPlanCard
              data={item}
              onCardClick={() => {
                console.log("click");
              }}
            />
          </div>
        ))}
      </div>
      {/* <PaymentBoard
        subcriptionid=""
        amount={0}
      /> */}
    </div>
  );
}
