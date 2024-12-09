"use client";

import PaymentBoard from "@/components/PaymentBoard/paymentBoard";
import React, { useEffect, useState } from "react";
import getAllSubcriptionPlan from "../api/subcriptionplan/getAllSubcription";
import { showResponseToast } from "@/lib/utils";
import SubcriptionPlanCard from "@/components/Card/subcriptionCard";
import Transition from "@/components/MotionFramer/transition";
import { Button } from "@nextui-org/button";
import { LineMdArrowSmallLeft } from "@/components/icons";
import { Card } from "@nextui-org/card";
import TestInfoCard from "@/components/Card/testInfoCard";
import getUserSubcription from "../api/subcriptionplan/getUserSubcription";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, user } from "@nextui-org/react";

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
  const [userSubcription, setUserSubcription] = useState<any>(null);
  const [sectionState, setSectionState] = useState(1);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function getAllSubcriptionPlanData() {
      const response = await getAllSubcriptionPlan();
      if (response.status == "success") {
        setSubcriptionListData(response.content.list);
      } else showResponseToast(response);
    }

    async function getUserSubcriptionData() {
      const response = await getUserSubcription();
      if (response.status == "success") {
        setUserSubcription(response.content);
      }
    }
    getUserSubcriptionData();
    getAllSubcriptionPlanData();
  }, []);

  const handleReceivePlanInfo = (data) => {
    setSelectedSubcription(data);
    if (data.priority < userSubcription?.priority) {
      onOpen();
    } else {
      setSectionState(2);
    }
  };

  const handleConfirmWarning = () => {
    onClose();
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
                    onCardClick={handleReceivePlanInfo}
                    showButton={item.price == "0" ? false : true}
                  />
                </div>
              ))}
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Cảnh báo</ModalHeader>
                  <ModalBody>
                    <p>
                      Quý khách đang chọn gói thành viên thấp hơn gói đang sử dụng. Nếu đồng ý, quý khách sẽ mất phúc lợi hiện tại nhưng vẫn
                      đảm bảo số ngày sử dụng
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleConfirmWarning}>
                      Đồng ý
                    </Button>
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}>
                      Chọn lại
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
          <div
            className="mb-24"
            style={{
              display: selectedSubcription ? "block" : "none",
            }}>
            <div className="mb-6 flex flex-col justify-center items-center">
              <h1 className="text-2xl ">Xác nhận hoá đơn</h1>
              <div className="flex flex-row mt-8">
                <TestInfoCard />
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
          </div>
        </Transition>
      )}
    </Transition>
  );
}
