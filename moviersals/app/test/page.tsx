"use client";

import PaymentBoard from "@/components/PaymentBoard/paymentBoard";
import React, { useEffect, useState } from "react";
import getAllSubcriptionPlan from "../api/subcriptionplan/getOrderHistory";
import { showResponseToast } from "@/lib/utils";
import SubcriptionPlanCard from "@/components/Card/subcriptionCard";
import { Divider } from "@nextui-org/react";

interface selectedSubcriptionProps {
  subcriptionid: string;
  name: string;
  price: string;
  daysduration: string;
  connection: string;
  quality: string;
  baseprice: string;
  isads: boolean;
}

export default function PaymentMethodsComponent() {
  const [subcriptionListData, setSubcriptionListData] = useState<Array<any>>([]);
  const [selectedSubcription, setSelectedSubcription] = useState<selectedSubcriptionProps>(null);

  useEffect(() => {
    async function getAllSubcriptionPlanData() {
      const response = await getAllSubcriptionPlan();
      if (response.status == "success") {
        setSubcriptionListData(response.content);
      } else showResponseToast(response);
    }

    getAllSubcriptionPlanData();
  }, []);

  const handleReceivePlanInfo = (data) => {
    setSelectedSubcription(data);
    // create me delay function
    setTimeout(() => {
      const targetPosition = 600;
      const step = 10; // Pixels to scroll in each step
      const delay = 5; // Delay between each step in milliseconds
      if (window.scrollY < targetPosition) {
        let currentScroll = window.scrollY; // Get the current scroll position
        const scrollAnimation = setInterval(() => {
          if (currentScroll < targetPosition) {
            currentScroll += step;
            window.scrollTo({
              top: currentScroll,
              behavior: "instant", // No smooth behavior here, handled by steps
            });
          } else {
            clearInterval(scrollAnimation); // Stop scrolling when target is reached
          }
        }, delay);
      }
    }, 200);
    console.log("Here: ", data.subcriptionid, data.price);
  };

  return (
    <div>
      <div className="mt-12 mb-12 flex flex-row flex-wrap gap-12 justify-center">
        {subcriptionListData.map((item, index) => (
          <div key={index}>
            <SubcriptionPlanCard
              data={item}
              onCardClick={handleReceivePlanInfo}
              showButton={true}
            />
          </div>
        ))}
      </div>
      <div
        className="mb-24"
        style={{
          display: selectedSubcription ? "block" : "none",
        }}>
        <Divider className="mb-12" />
        <PaymentBoard
          paymentData={selectedSubcription}
          element={
            <SubcriptionPlanCard
              data={selectedSubcription}
              onCardClick={null}
              showButton={false}
            />
          }
        />
      </div>
    </div>
  );
}
