"use client"

import getAllMovie from "@/api/movies/getAllMovie";
import uploadMovie from "@/api/movies/uploadMovie";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { videosMockup } from "@/config/videosMockup";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMovie();
      setData(response);
    };

    fetchData();
  }, []);

  const tableData = {
    headerData: [
      { colname: "name", colsub: "Tên phim" },
      { colname: "publisher", colsub: "Nhà sản xuất" },
      { colname: "thumbnail", colsub: "Ảnh bìa" },
      { colname: "description", colsub: "Mô tả" },
    ],
    bodyData: videosMockup
  }

  const adminFormCofig: AdminFormCofig = {
    colList: [
      { colname: "name", colsub: "Tên phim", coltype: "inputtext", colvalues: null },
      { colname: "description", colsub: "Mô tả", coltype: "inputtext", colvalues: null },
      { colname: "publisher", colsub: "Nhà sản xuất", coltype: "inputtext", colvalues: null },
      { colname: "publishyear", colsub: "Năm sản xuất", coltype: "inputnumber", colvalues: null },
      { colname: "thumbnail", colsub: "Ảnh bìa (đường dẫn)", coltype: "inputfile", colvalues: null },
      {
        colname: "categories", colsub: "Thể loại", coltype: "checkbox", colvalues: [
          { key: "action", value: "Hành động", },
          { key: "science fiction", value: "Khoa học viễn tưởng", },
          { key: "adventure", value: "Phiêu lưu", },
          { key: "comedy", value: "Hài hước", },
          { key: "documentary", value: "Tài liệu", },
          { key: "drama", value: "Kịch tính", },
          { key: "romance", value: "Lãng mạn", },
          { key: "horror", value: "Kinh dị", },
        ]
      },
      {
        colname: "type", colsub: "Loại phim", coltype: "radio", colvalues: [
          { key: "movie", value: "Phim lẻ", },
          { key: "series", value: "Phim bộ", },
        ]
      },
      {
        colname: "ispremium", colsub: "Hạng vé", coltype: "radio", colvalues: [
          { key: true, value: "VIP", },
          { key: false, value: "Phổ thông", },
        ]
      },
    ],
    buttonText: "Tạo mới",
    handler: async (request: { [key: string]: any }) => {
      const keyValues = Object.entries(request);
      keyValues.forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // CONVERT ARRAY OBJECT TO STRING ARRAY
          request[key] = JSON.stringify(value);
        } else if (typeof value === "string" && (value === "true" || value === "false")) {
          // CONVERT STRING TO BOOLEAN
          request[key] = value === "true";
        }
      });
      console.log(request);
      const response = await uploadMovie(request);
    },
  }

  return (
    <div>
      <>{data}</>
      <h1 className={title()}>Quản lý phim ảnh</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}
      >
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex lg:flex-row flex-col-reverse">
        <div className="lg:w-4/5 lg:mr-8">
          <TableNextUI tableData={tableData} />
        </div>
        <div className="lg:w-1/5 mb-4">
          <AdminForm adminFormCofig={adminFormCofig} />
        </div>
      </div>
    </div>
  );
}
