"use client";

import getAllUser from "@/app/api/account/getAllUser";
import register from "@/app/api/account/register";
import updateState from "@/app/api/account/updateState";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { getObjectById, showResponseToast } from "@/lib/utils";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  // MODAL
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [dataModal, setDataModal] = useState(null);
  const [isRefetch, setIsRefetch] = useState(false);
  const [page, setPage] = useState(1);

  // MAIN
  const [data, setData] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [pathname, isRefetch, page]);

  const fetchData = async () => {
    const response = await getAllUser();
    const content = response.content;
    console.log(content);
    setData(content);
  };

  const tableData = {
    headerData: [
      { colname: "username", colsub: "Tài khoản" },
      { colname: "displayname", colsub: "Tên hiển thị" },
      { colname: "email", colsub: "Email người dùng" },
      { colname: "role", colsub: "Loại tài khoản" },
      { colname: "ispremium", colsub: "Hạng vé VIP" },
    ],
    bodyData: data,
    optionsButtonContent: <div className="flex place-items-center">Xem thông tin</div>,
    optionsButtonValue: "id",
    optionsHandler: function (id) {
      const idInformation = getObjectById(data?.list, id);
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
      { colname: "username", colsub: "Tên tài khoản", coltype: "inputtext", colvalues: null },
      { colname: "password", colsub: "Mật khẩu", coltype: "inputpassword", colvalues: null },
      { colname: "displayname", colsub: "Tên hiển thị", coltype: "inputtext", colvalues: null },
      { colname: "email", colsub: "Email", coltype: "inputtext", colvalues: null },
      { colname: "phonenumber", colsub: "Số điện thoại", coltype: "inputtext", colvalues: null },
    ],
    buttonText: "Tạo người dùng",
    handler: async (formData: FormData) => {
      const displayname = formData.get("displayname")?.toString();
      const email = formData.get("email")?.toString();
      const phonenumber = formData.get("phonenumber")?.toString();
      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      // CALL API
      const response = await register(username, password, displayname, email, phonenumber);
      showResponseToast(response);
      if (response.status == "success") {
        setIsRefetch(!isRefetch);
      }
    },
  };

  const handleUpdateStatusAccount = async (value: Boolean) => {
    console.log("hehe");
    const request = {
      username: dataModal["username"],
      id: dataModal["id"],
      isactive: value,
    };
    const response = await updateState(request);
    showResponseToast(response);
    if (response.status == "success") {
      setIsRefetch(!isRefetch);
      onClose();
    }
  };

  return (
    <Transition>
      <h1 className={title()}>Quản lý phim ảnh</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/user">Khách hàng</BreadcrumbItem>
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Chi tiết tài khoản</ModalHeader>
              <ModalBody className="font-thin">
                <div>
                  ID: <b>{dataModal?.id}</b>
                </div>
                <div>
                  Tên hiển thị: <b>{dataModal?.displayname}</b>
                </div>
                <div>
                  Số điện thoại: <b>{dataModal?.phonenumber}</b>
                </div>
                <div>
                  Email: <b>{dataModal?.email}</b>
                </div>
                <br />
                <div>
                  Tên tài khoản: <b>{dataModal?.username}</b>
                </div>
                <div>
                  Hạng vé: <b>{dataModal?.ispremium ? "VIP" : "Phổ thông"}</b>
                </div>
                <div>
                  Xác thực email: <b>{dataModal?.isverified ? "Xác thực" : "Chưa xác thực"}</b>
                </div>
                <div>
                  Trạng thái tài khoản: <b>{dataModal?.isactive ? "Đang hoạt động" : "Tắt hoạt động"}</b>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color={dataModal?.isactive ? "danger" : "success"}
                  onClick={() => {
                    handleUpdateStatusAccount(!dataModal?.isactive);
                  }}>
                  {dataModal?.isactive ? "Tắt hoạt động" : "Bật hoạt động"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Transition>
  );
}
