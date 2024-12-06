"use client"

import getAllUser from "@/app/api/account/getAllUser";
import register from "@/app/api/account/register";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const pathname = usePathname();
  useEffect(() => {
    fetchData();
  }, [pathname]);

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
      { colname: "ispremium", colsub: "Loại vé sử dụng" },
    ],
    bodyData: data,
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
      const repassword = formData.get("repassword")?.toString();

      // CALL API
      const response = await register(username, password, displayname, email, phonenumber);
    },
  };

  return (
    <Transition>
      <h1 className={title()}>Quản lý phim ảnh</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}
      >
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
    </Transition>
  );
}
