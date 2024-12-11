"use client";

import createCategorie from "@/app/api/categories/createCategories";
import deleteCategorie from "@/app/api/categories/deleteCategories";
import editCategorie from "@/app/api/categories/editCategories";
import getAllCategories from "@/app/api/categories/getAllCategories";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { getObjectById, showResponseToast } from "@/lib/utils";
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

export default function CategeorieAdminPage() {
  // MODAL
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [dataModal, setDataModal] = useState(null);
  const [page, setPage] = useState(1);
  // MAIN
  const [data, setData] = useState(null);
  const [isRefetch, setIsRefetch] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [pathname, isRefetch, page]);

  const fetchData = async () => {
    const response = await getAllCategories(page);
    const content = response.content;
    console.log(content);
    setData(content);
  };

  const tableData = {
    headerData: [
      { colname: "name", colsub: "Tên thể loại(EN)" },
      { colname: "namevi", colsub: "Tên thể loại(VI)" },
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

    changePage: function (page: number) {
      setPage(page);
    },
  };

  const adminFormCofig: AdminFormCofig = {
    label: "Tạo mới",
    colList: [
      { colname: "name", colsub: "Tên thể loại(EN)", coltype: "inputtext", colvalues: null },
      { colname: "namevi", colsub: "Tên thể loại(VI)", coltype: "inputtext", colvalues: null },
    ],
    buttonText: "Tạo thể loại",
    handler: async (formData: FormData) => {
      const response = await createCategorie(formData);
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
      const response = await editCategorie(formData);
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

  async function handleDelte(id: string, name: string) {
    const body = { id: id, name: name };
    const response = await deleteCategorie(body);
    showResponseToast(response);
    if (response.status == "success") {
      setIsRefetch(!isRefetch);
      onClose();
    }
  }

  return (
    <Transition>
      <h1 className={title()}>Quản lý thể loại</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/categories">Thể loại</BreadcrumbItem>
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
                <ModalHeader className="flex flex-col gap-1">Thể loại</ModalHeader>
                <ModalBody className="font-thin">
                  <Input
                    readOnly
                    name="id"
                    label="ID thể loại"
                    defaultValue={dataModal.id}
                  />
                  <Input
                    name="name"
                    label="Tên thể loại (EN)"
                    defaultValue={dataModal.name}
                  />
                  <Input
                    name="namevi"
                    label="Tên thể loại (VI)"
                    defaultValue={dataModal.namevi}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    onPress={onClose}>
                    Đóng
                  </Button>
                  <Button
                    color="danger"
                    onPress={async () => await handleDelte(dataModal.id, dataModal.name)}>
                    Xóa thể loại
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
