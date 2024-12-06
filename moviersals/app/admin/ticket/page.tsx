"use client"

import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  // MAIN
  const [data, setData] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // fetchData();
  }, [pathname]);

  // const fetchData = async () => {
  //   const response = await getAllUser();
  //   const content = response.content;
  //   console.log(content);
  //   setData(content);
  // };

  const tableData = {
    headerData: [
      { colname: "username", colsub: "Tài khoản" },
      { colname: "displayname", colsub: "Tên hiển thị" },
      { colname: "email", colsub: "Email người dùng" },
      { colname: "role", colsub: "Loại tài khoản" },
      { colname: "ispremium", colsub: "Hạng vé VIP" },
    ],
    bodyData: data,
    optionsButtonContent: (
      <div className="flex place-items-center">
        Xem thông tin
      </div>
    ),
    optionsButtonValue: "id",
    optionsHandler: function (id) {
      const idInformation = getObjectById(data, id);
      setDataModal(idInformation);
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
      // CALL API
      const response = await register(formData);
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
    </Transition>
  );
}
