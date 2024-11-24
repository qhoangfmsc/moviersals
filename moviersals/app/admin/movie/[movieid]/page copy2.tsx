"use client";

import getMovieDetailById from "@/api/movies/getMovieById";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import { title } from "@/components/primitives";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface MovieDetails {
  movieid: string;
  name: string;
}

export default function MovieDetailAdminPage({
  params,
}: {
  params: {
    movieid: string;
  };
}) {
  const [detailData, setData] = useState<MovieDetails>();

  const fetchData = async () => {
    const response = await getMovieDetailById(params.movieid);
    const content = await response.content;
    console.log(content);
    setData(content);
  };

  useEffect(() => {
    console.log("WAT", params);
    fetchData();
  }, []);

  const adminFormCofig: AdminFormCofig = {
    label: "Chỉnh sửa",
    colList: [
      { colname: "name", colsub: "Tên phim", coltype: "inputtext", colvalues: null },
      { colname: "description", colsub: "Mô tả", coltype: "inputtext", colvalues: null },
      { colname: "publisher", colsub: "Nhà sản xuất", coltype: "inputtext", colvalues: null },
      { colname: "publishyear", colsub: "Năm sản xuất", coltype: "inputnumber", colvalues: null },
      { colname: "thumbnail", colsub: "Ảnh bìa (đường dẫn)", coltype: "inputfile", colvalues: null },
    ],
    buttonText: "Xác nhận",
    handler: async (request: { [key: string]: any }) => {
      console.log(request);
    },
  };

  return (
    <div>
      <h1 className={title()}>
        Quản lý phim {detailData?.name} (#{detailData?.movieid})
      </h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
        <BreadcrumbItem href={`/admin/movie/${detailData?.movieid}`}>{detailData?.name}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex lg:flex-row flex-col-reverse">
        <div className="lg:w-4/5 lg:mr-8">
          <div className="flex flexrow">
            <Button color="success">Thêm mới tập phim</Button>
          </div>
        </div>
        <div className="lg:w-1/5 mb-4">
          <AdminForm adminFormCofig={adminFormCofig} />
        </div>
      </div>
    </div>
  );
}
