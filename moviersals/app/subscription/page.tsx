"use client";

import PaymentBoard from "@/components/PaymentBoard/paymentBoard";
import React, { useEffect, useState } from "react";
import getAllSubcriptionPlan from "../api/subcriptionplan/getAllSubcription";
import { showResponseToast } from "@/lib/utils";
import SubcriptionPlanCard from "@/components/Card/subcriptionCard";
import Transition from "@/components/MotionFramer/transition";
import { Button } from "@nextui-org/button";
import { LineMdArrowSmallLeft } from "@/components/icons";
import getUserSubcription from "../api/subcriptionplan/getUserSubcription";
import getUserSubcriptionPrice from "../api/subcriptionplan/getUserSubcriptionPrice";

interface selectedSubcriptionProps {
  subcriptionid: string;
  name: string;
  price: string;
  daysduration: string;
  connection: string;
  quality: string;
  baseprice: string;
  priority: string;
  isads: boolean;
  newPrice?: string;
}

export default function PaymentMethodsComponent() {
  const [subcriptionListData, setSubcriptionListData] = useState<Array<any>>([]);
  const [selectedSubcription, setSelectedSubcription] = useState<selectedSubcriptionProps>(null);
  const [userSubcription, setUserSubcription] = useState<any>(null);
  const [sectionState, setSectionState] = useState(1);

  useEffect(() => {
    async function getAllSubcriptionPlanData() {
      const response = await getAllSubcriptionPlan();
      if (response?.status == "success") {
        setSubcriptionListData(response.content.list);
      } else showResponseToast(response);
    }

    async function getUserSubcriptionData() {
      const response = await getUserSubcription();
      if (response?.status == "success") {
        setUserSubcription(response.content);
      }
    }
    getUserSubcriptionData();
    getAllSubcriptionPlanData();
  }, []);

  const handleReceivePlanInfo = async (data) => {
    const response = await getUserSubcriptionPrice(data.subcriptionid);
    console.log(response);
    setSelectedSubcription({ ...data, newPrice: response.content });
    setSectionState(2);
  };

  return (
    <Transition>
      {sectionState == 1 && (
        <Transition>
          <div>
            <div className="mb-6 mt-6 flex justify-center">
              <h1 className="text-2xl">Chọn gói sử dụng</h1>
            </div>
            <div className="mt-12 mb-12 flex flex-row flex-wrap gap-12 justify-center">
              {subcriptionListData?.map((item, index) => (
                <div key={index}>
                  <SubcriptionPlanCard
                    data={item}
                    userData={userSubcription}
                    onCardClick={handleReceivePlanInfo}
                    showButton={item.price == "0" ? false : true}
                  />
                </div>
              ))}
            </div>
          </div>
        </Transition>
      )}
      {sectionState == 2 && (
        <Transition>
          <Button
            className="rounded-full"
            size="lg"
            variant="light"
            startContent={<LineMdArrowSmallLeft />}
            onClick={() => setSectionState(1)}>
            Chọn lại gói
          </Button>
          <div className="mb-24">
            <div className="mb-6 flex flex-col justify-center items-center">
              <h1 className="text-2xl ">Xác nhận hoá đơn</h1>
              <div className="flex flex-row mt-8">
                {/* <TestInfoCard /> */}
                <PaymentBoard
                  userData={userSubcription}
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
          </div>
        </Transition>
      )}
    </Transition>
  );
}
