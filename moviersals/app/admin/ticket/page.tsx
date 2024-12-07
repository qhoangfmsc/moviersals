"use client";

import createSubscriptionPlan from "@/app/api/subcriptionplan/createSubscription";
import deleteSubscriptionPlan from "@/app/api/subcriptionplan/deleteSubscription";
import editSubscriptionPlan from "@/app/api/subcriptionplan/editSubscription";
import getAllSubcriptionPlan from "@/app/api/subcriptionplan/getAllSubcription";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { convertFormDataToJson, getObjectById, showResponseToast } from "@/lib/utils";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function MovieAdminPage() {
  // MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataModal, setDataModal] = useState(null);
  const [isRefetch, setIsRefetch] = useState(false);

  // MAIN
  const [data, setData] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [pathname, isRefetch]);

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
    optionsButtonContent: <div className="flex place-items-center">Xem thông tin</div>,
    optionsButtonValue: "id",
    optionsHandler: function (id) {
      const idInformation = getObjectById(data?.list, id);
      console.log(idInformation);
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
      { colname: "quality", colsub: "Chất lượng tối đa", coltype: "inputtext", colvalues: null },
      { colname: "connection", colsub: "IP tối đa", coltype: "inputnumber", colvalues: null },
    ],
    buttonText: "Tạo gói",
    handler: async (formData: FormData) => {
      const response = await createSubscriptionPlan(formData);
      showResponseToast(response);
      if (response.status == "success") {
        setIsRefetch(!isRefetch);
      }
    },
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      formData.forEach((value, key) => console.log(key, value));
      const response = await editSubscriptionPlan(formData);
      showResponseToast(response);
      if (response.status == "success") {
        setIsRefetch(!isRefetch);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async function handleDelete(subcriptionid: string, onClose: () => void) {
    try {
      const request = { subcriptionid: subcriptionid };
      const response = await deleteSubscriptionPlan(request);
      showResponseToast(response);
      if (response.status == "success") {
        setIsRefetch(!isRefetch);
        onClose();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <Transition>
      <h1 className={title()}>Quản lý hạng vé</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        {dataModal && (
          <ModalContent>
            {(onClose) => (
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">Chi tiết hạng vé</ModalHeader>
                <ModalBody className="font-thin">
                  <Input
                    key={dataModal.priority}
                    name={"priority"}
                    label="Độ ưu tiên"
                    defaultValue={dataModal.priority}
                  />
                  <Input
                    key={dataModal.subcriptionid}
                    name={"subcriptionid"}
                    label="ID gói"
                    defaultValue={dataModal.subcriptionid}
                  />
                  <Input
                    key={dataModal.name}
                    name={"name"}
                    label="Tên gói"
                    defaultValue={dataModal.name}
                  />
                  <Input
                    key={dataModal.baseprice}
                    name={"baseprice"}
                    label="Giá gốc"
                    defaultValue={dataModal.baseprice}
                  />
                  <Input
                    key={dataModal.price}
                    name={"price"}
                    label="Giá bán"
                    defaultValue={dataModal.price}
                  />
                  <Input
                    key={dataModal.daysduration}
                    name={"daysduration"}
                    label="Thời hạn sử dụng"
                    defaultValue={dataModal.daysduration}
                  />
                  <Input
                    key={dataModal.quality}
                    name={"quality"}
                    label="Chất lượng tối đa"
                    defaultValue={dataModal.quality}
                  />
                  <Input
                    key={dataModal.connection}
                    name={"connection"}
                    label="IP tối đa"
                    defaultValue={dataModal.connection}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={async () => handleDelete(dataModal.subcriptionid, onClose)}>
                    Xóa
                  </Button>
                  <Button
                    color="default"
                    variant="light"
                    onPress={onClose}>
                    Đóng
                  </Button>
                  <Button
                    type="submit"
                    color="success">
                    Xác nhận thay đổi
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        )}
      </Modal>
    </Transition>
  );
}
