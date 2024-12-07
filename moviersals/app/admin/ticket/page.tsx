"use client"

import createSubscriptionPlan from "@/app/api/subcriptionplan/createSubscription";
import getAllSubcriptionPlan from "@/app/api/subcriptionplan/getAllSubcription";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { getObjectById } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  // MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataModal, setDataModal] = useState(null);

  // MAIN
  const [data, setData] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [pathname]);

  const fetchData = async () => {
    const response = await getAllSubcriptionPlan();
    const content = response.content;
    console.log(content);
    setData(content);
  };

  const tableData = {
    headerData: [
      { colname: "priority", colsub: "Độ ưu tiên" },
      { colname: "subcriptionid", colsub: "ID gói" },
      { colname: "name", colsub: "Tên gói" },
      { colname: "baseprice", colsub: "Giá gốc" },
      { colname: "price", colsub: "Giá bán" },
      { colname: "daysduration", colsub: "Thời hạn sử dụng" },
      { colname: "isads", colsub: "Quảng cáo" },
      { colname: "quality", colsub: "Chất lượng tối đa" },
      { colname: "connection", colsub: "Số lượng IP kết nối" },
    ],
    bodyData: data,
    optionsButtonContent: (
      <div className="flex place-items-center">
        Xem thông tin
      </div>
    ),
    optionsButtonValue: "subcriptionid",
    optionsHandler: function (id) {
      const idInformation = getObjectById(data, id);
      setDataModal(idInformation);
      onOpen();
    },
  };

  const adminFormCofig: AdminFormCofig = {
    label: "Tạo mới",
    colList: [
      { colname: "priority", colsub: "Độ ưu tiên", coltype: "inputnumber", colvalues: null },
      { colname: "subcriptionid", colsub: "ID gói", coltype: "inputtext", colvalues: null },
      { colname: "name", colsub: "Tên gói", coltype: "inputtext", colvalues: null },
      { colname: "baseprice", colsub: "Giá gốc", coltype: "inputnumber", colvalues: null },
      { colname: "price", colsub: "Giá bán", coltype: "inputnumber", colvalues: null },
      { colname: "daysduration", colsub: "Thời hạn sử dụng", coltype: "inputnumber", colvalues: null },
      { colname: "quality", colsub: "Chất lượng tối đa", coltype: "inputnumber", colvalues: null },
    ],
    buttonText: "Tạo gói",
    handler: async (formData: FormData) => {
      const response = await createSubscriptionPlan(formData);
    },
  };

  return (
    <Transition>
      <h1 className={title()}>Quản lý hạng vé</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}
      >
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/ticket">Hạng vé</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex lg:flex-row flex-col-reverse">
        <div className="lg:w-4/5 lg:mr-8">
          <TableNextUI tableData={tableData} />
        </div>
        <div className="lg:w-1/5 mb-4">
          <AdminForm
            adminFormCofig={adminFormCofig}
            rerenderData={null}
          />
        </div>
      </div>

      {/* MODAL DETAIL */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Chi tiết hạng vé</ModalHeader>
              <ModalBody className="font-thin">
                <div>Độ ưu tiên: <b></b></div>
                <Input key={dataModal?.priority} />
                <div>ID gói: <b></b></div>
                <Input key={dataModal?.subcriptionid} />
                <div>Tên gói: <b></b></div>
                <Input key={dataModal?.name} />
                <div>Giá gốc: <b></b></div>
                <Input key={dataModal?.baseprice} />
                <div>Giá bán: <b></b></div>
                <Input key={dataModal?.price} />
                <div>Thời hạn sử dụng: <b></b></div>
                <Input key={dataModal?.daysduration} />
                <div>Chất lượng tối đa: <b></b></div>
                <Input key={dataModal?.quality} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="success">
                  Xác nhận thay đổi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Transition>
  );
}
