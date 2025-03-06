"use client";

import getAllCategories from "@/app/api/categories/getAllCategories";
import getAllMovie from "@/app/api/movies/getAllMovie";
import uploadMovie from "@/app/api/movies/uploadMovie";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import { BxsCategory, LetsIconsExpandRight } from "@/components/icons";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import TableNextUI from "@/components/Table/tableNextUI";
import { showResponseToast } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieAdminPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, [pathname, isRefetch, page]);

  const fetchData = async () => {
    const response = await getAllMovie(page);
    const content = response.content;
    setData(content);
  };

  const fetchCategories = async () => {
    const response = await getAllCategories(null);
    const content = response.content;

    const list = content.list.map(item => ({
      key: item.name.toLowerCase(),
      value: capitalizeFirstLetter(item.namevi)
    }));
    setCategories(list);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

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
    changePage: function (page: number) {
      setPage(page);
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
        colvalues: categories,
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
      showResponseToast(response);
      if (response?.status == "success") {
        setIsRefetch(!isRefetch);
      }
    },
  };

  return (
    <Transition>
      <h1 className={title()}>Quản lý phim ảnh</h1>
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          className="my-4"
          itemClasses={{
            item: "px-2",
            separator: "px-0",
          }}>
          <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
          <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
        </Breadcrumbs>
        <Button
          className="text-white"
          endContent={<BxsCategory />}
          color="success"
          onClick={() => router.push("/admin/categories")}>
          Chỉnh sửa thể loại phim
        </Button>
      </div>
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
