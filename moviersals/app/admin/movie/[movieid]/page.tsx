"use client";

import { useEffect, useState } from "react";
import getMovieDetailById from "@/app/api/movies/getMovieById";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { title } from "@/components/primitives";
import AdminEpisodeCard from "@/components/Card/episodeCard";
import editMovie from "@/app/api/movies/editMovie";
import AddNewEpisodeAdminForm from "@/components/Episode/episodeAdminForm";
import AdminForm, { AdminFormCofig } from "@/components/Form/adminForm";
import Transition from "@/components/MotionFramer/transition";
import { showResponseToast } from "@/lib/utils";
import CloudinaryVideoPlayer from "@/components/Video/videoplayer";
import deleteEpisode from "@/app/api/episode/deleteEpisode";

export default function episodeEpisodesListForm({ params }: { params: { movieid: string } }) {
  const {
    isOpen: isModalCreateOpen,
    onOpen: onOpenModalCreate,
    onClose: onCloseModalCreate,
    onOpenChange: onOpenChangeModalCreate,
  } = useDisclosure();

  const {
    isOpen: isModalViewOpen,
    onOpen: onOpenModalView,
    onClose: onCloseModalView,
    onOpenChange: onOpenChangeModalView,
  } = useDisclosure();

  const [data, setData] = useState<any>({});
  const [dataView, setDataView] = useState<any>({});
  const [isRefetch, setIsRefetch] = useState(false);
  const [userinfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [isRefetch]);

  const fetchData = async () => {
    const tempUserinfo = JSON.parse(localStorage.getItem("userinfo")) || null;
    if (userinfo == null) setUserInfo(tempUserinfo);

    const response = await getMovieDetailById(params.movieid, null);
    const content = response.content;
    // console.log(content);
    setData(content);
  };

  const handleCreateClick = () => {
    onOpenModalCreate();
  };

  const handleViewClick = (item: Record<string, any>) => {
    onOpenModalView();
    setDataView(item);
    console.log(item);
  };

  const handleDeleteEpisode = async () => {
    onCloseModalView();
    const request = {
      movieid: dataView?.movieid,
      episodeid: dataView?.episodeid,
      episodenumber: dataView?.episodenumber,
    };
    const response = await deleteEpisode(request);
    showResponseToast(response);
    if (response?.status == "success") {
      setIsRefetch(!isRefetch);
    }
  };

  const adminFormCofig: AdminFormCofig = {
    label: "Chỉnh sửa",
    colList: [
      { colname: "movieid", colsub: "ID phim", coltype: "inputtext", colvalues: null, isDisabled: true },
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
      showResponseToast(response);
      if (response?.status == "success") {
        setIsRefetch(!isRefetch);
      }
    },
  };

  function handleCreateEpisode() {
    onCloseModalCreate();
    setIsRefetch(!isRefetch);
  }

  return (
    <Transition>
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
                <AdminEpisodeCard
                  key={item.episodeid}
                  cardData={item}
                  allData={data}
                  onCardClick={(item) => {
                    handleViewClick(item);
                  }}
                />
              ))
            ) : (
              <></>
            )}
            {(data?.movieDetail?.type === "tseries" || (data?.movieDetail?.type === "movie" && data?.list?.length < 1)) && (
              <AdminEpisodeCard
                key={"null"}
                onCardClick={() => {
                  handleCreateClick();
                }}
              />
            )}
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
        isOpen={isModalCreateOpen}
        onOpenChange={onOpenChangeModalCreate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{"Thêm tập phim"}</ModalHeader>
          <ModalBody>
            <AddNewEpisodeAdminForm
              movieid={params.movieid}
              handleClose={() => handleCreateEpisode()}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      {dataView && (
        <Modal
          isOpen={isModalViewOpen}
          onOpenChange={onOpenChangeModalView}
          size="5xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Chi tiết tập phim</ModalHeader>
            <ModalBody>
              {dataView && (
                <div className="mb-4">
                  <CloudinaryVideoPlayer
                    publicid={dataView?.episodepath?.match(/\/upload\/v\d+\/(.+)/)[1].split(".")[0]}
                    movieid={dataView?.movieid}
                    episodenumber={dataView?.episodenumber}
                    userinfo={userinfo}
                  />
                </div>
              )}
              <h1 className="text-xl">
                Tập {dataView.episodenumber}: {dataView.name}
              </h1>
              <h1 className={title()}>{data?.movieDetail?.name}</h1>
              <h1 className="text-sm">
                Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span>
              </h1>
              <div className="flex flex-wrap h-5 font-black mt-8 space-x-8">
                <Divider orientation="vertical" />
                <h1 className="text-sm">{data?.movieDetail?.publishyear}</h1>
                <Divider orientation="vertical" />
                {Array.isArray(data?.movieDetail?.categoriesvi)
                  ? data?.movieDetail?.categoriesvi.map(
                      (cat, index) =>
                        cat && (
                          <div key={index}>
                            <div className="text-sm">{cat}</div>
                          </div>
                        )
                    )
                  : JSON.parse(data?.movieDetail?.categoriesvi || "[]").map(
                      (cat: string, index: number) =>
                        cat && (
                          <div key={index}>
                            <div className="text-sm">{cat}</div>
                          </div>
                        )
                    )}
                <Divider orientation="vertical" />
              </div>
              <p className="my-8 text-sm leading-6 text-gray-400">{data?.movieDetail?.description}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onCloseModalView}>
                Đóng
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteEpisode}>
                Xoá tập hiện tại
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Transition>
  );
}
