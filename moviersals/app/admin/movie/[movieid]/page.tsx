"use client";

import { FormEvent, useEffect, useState } from "react";
import uploadEpisode from "@/app/api/episode/uploadEpisode";
import getMovieDetailById from "@/app/api/movies/getMovieById";
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
import { title } from "@/components/primitives";
import EpisodeCard from "@/components/Card/episodeCard";
import VideoUploader from "@/components/Cloudinary/uploadvideo";
import editMovie from "@/app/api/movies/editMovie";
import AddNewEpisodeAdminForm from "@/components/Episode/episodeAdminForm";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";

export default function episodeEpisodesListForm({ params }: { params: { movieid: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getMovieDetailById(params.movieid);
    const content = response.content;
    console.log(content);
    setData(content);
  };

  const handleCreateClick = () => {
    onOpen();
  };

  const adminFormCofig: AdminFormCofig = {
    label: "Chỉnh sửa",
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
    buttonText: "Xác nhận",
    handler: async (request: { [key: string]: any }) => {
      const response = await editMovie(request);
    },
  };

  return (
    <div>
      <h1 className={title()}>Quản lý phim {data?.movieDetail?.name}</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/movie">Phim ảnh</BreadcrumbItem>
        <BreadcrumbItem href={`/admin/movie/${data?.movieDetail?.movieid}`}>{data?.movieDetail?.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex lg:flex-row flex-col-reverse">
        <div className="lg:w-4/5 lg:mr-8">
          <div className="flex flex-row flex-wrap gap-3">
            {data?.list?.length > 0 ? (
              data?.list?.map((item: any) => (
                <EpisodeCard
                  key={item.episodeid}
                  cardData={item}
                  onCardClick={null}
                />
              ))
            ) : (
              <></>
            )}
            <EpisodeCard
              key={"null"}
              cardData={null}
              onCardClick={handleCreateClick}
            />
          </div>
        </div>
        <div className="lg:w-1/5 mb-4">
          <AdminForm
            adminFormCofig={adminFormCofig}
            rerenderData={data?.movieDetail}
          />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{"Thêm tập phim"}</ModalHeader>
              <ModalBody>
                <AddNewEpisodeAdminForm movieid={params.movieid} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
