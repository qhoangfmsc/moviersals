"use client";

import getAllMovie from "@/app/api/movies/getAllMovie";
import uploadMovie from "@/app/api/movies/uploadMovie";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import { LetsIconsExpandRight } from "@/components/icons";
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
    const response = await getAllMovie(1);
    const content = response.content;
    setData(content);
  };

  const tableData = {
    headerData: [
      { colname: "thumbnail", colsub: "Thumbnail" },
      { colname: "name", colsub: "Tên phim" },
      { colname: "publishyear", colsub: "Năm sản xuất" },
      { colname: "type", colsub: "Loại phim" },
      { colname: "ispremium", colsub: "Hạng vé VIP" },
    ],
    bodyData: data,
    optionsButtonContent: (
      <div className="flex place-items-center">
        Xem chi tiết &nbsp; <LetsIconsExpandRight />
      </div>
    ),
    optionsButtonValue: "movieid",
    optionsHandler: function (movieid) {
      const href = `/admin/movie/${movieid}`;
      router.push(href);
    },
  };

  const adminFormCofig: AdminFormCofig = {
    label: "Tạo mới",
    colList: [
      { colname: "name", colsub: "Tên phim", coltype: "inputtext", colvalues: null },
      { colname: "description", colsub: "Mô tả", coltype: "inputtext", colvalues: null },
      { colname: "publisher", colsub: "Nhà sản xuất", coltype: "inputtext", colvalues: null },
      { colname: "publishyear", colsub: "Năm sản xuất", coltype: "inputnumber", colvalues: null },
      { colname: "thumbnail", colsub: "Ảnh bìa (đường dẫn)", coltype: "inputfile", colvalues: null },
      {
        colname: "categories",
        colsub: "Thể loại",
        coltype: "checkbox",
        colvalues: [
          { key: "action", value: "Hành động" },
          { key: "science fiction", value: "Khoa học viễn tưởng" },
          { key: "adventure", value: "Phiêu lưu" },
          { key: "comedy", value: "Hài hước" },
          { key: "documentary", value: "Tài liệu" },
          { key: "drama", value: "Kịch tính" },
          { key: "romance", value: "Lãng mạn" },
          { key: "horror", value: "Kinh dị" },
        ],
      },
      {
        colname: "type",
        colsub: "Loại phim",
        coltype: "radio",
        colvalues: [
          { key: "movie", value: "Phim lẻ" },
          { key: "tseries", value: "Phim bộ" },
        ],
      },
      {
        colname: "ispremium",
        colsub: "Hạng vé",
        coltype: "radio",
        colvalues: [
          { key: true, value: "VIP" },
          { key: false, value: "Phổ thông" },
        ],
      },
    ],
    buttonText: "Tạo mới",
    handler: async (request: { [key: string]: any }) => {
      const response = await uploadMovie(request);
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
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
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
