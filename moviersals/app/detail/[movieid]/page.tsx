"use client";

import getMovieDetailById from "@/app/api/movies/getMovieById";
import {
  IconStar,
  LineMdArrowSmallLeft,
  LineMdPlayFilled,
  MdiEyeOutline,
  SvgSpinnersClock,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { toast } from "react-toastify";
import { Button, Chip, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Transition from "@/components/MotionFramer/transition";

export default function DetailPage({
  params,
}: {
  params: { movieid: string };
}) {
  const [data, setData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getMovieDetailById(params.movieid, null);
    const content = response.content;
    console.log(content);
    setData(content);
  };

  const directWatchPage = (episodenumber: string) => {
    console.log("watch", episodenumber);
    const href = `/detail/${params.movieid}/${episodenumber}`;
    router.push(href);
  };

  return (
    <Transition>
      <div className="relative min-h-full h-[calc(1000px-8rem)] w-full">
        <div
          className="absolute"
          style={{
            left: "0",
            top: "-5rem",
          }}
        >
          <Image
            height={1000}
            className="object-cover z-0 w-screen"
            alt="Thumbnail"
            src={data?.movieDetail?.thumbnail}
          />
        </div>
        <div className="absolute left-0 top-0 flex flex-row w-full h-[1000px]">
          <div
            className="relative p-10 lg:p-16 flex flex-col lg:basis-1/3 bg-black/80"
            style={{ backdropFilter: "blur(7px)" }}
          >
            <div className="mb-16">
              <Button
                className="rounded-full"
                size="lg"
                variant="light"
                startContent={<LineMdArrowSmallLeft />}
                onClick={() => router.back()}
              >
                Quay lại
              </Button>
            </div>
            <Chip
              size="md"
              radius="sm"
              color={data?.movieDetail?.ispremium ? "danger" : "primary"}
              variant="dot"
            >
              {data?.movieDetail?.ispremium ? "Trả phí" : "Miễn phí"}
            </Chip>
            <div className="my-2">
              <h1 className={title()}>{data?.movieDetail?.name}</h1>
              <h1 className="text-sm text-gray-400 mt-2">
                Nhà sản xuất: <span>{data?.movieDetail?.publisher}</span>
              </h1>

              <div className="flex text-tiny text-gray-400 mt-8">
                <div className="self-center">
                  <MdiEyeOutline />
                </div>
                <div className="self-center">
                  &nbsp; {data?.movieDetail?.view ?? "Chưa có"} lượt xem
                </div>
              </div>
              <div className="flex justify-between text-gray-300 font-black mt-2">
                <h1 className="text-sm">
                  {(Array.isArray(data?.movieDetail?.categoriesvi)
                    ? data?.movieDetail?.categoriesvi
                    : JSON.parse(data?.movieDetail?.categoriesvi || "[]")
                  )?.map((cat: string, index: number) => (
                    <span key={index}>
                      {cat}
                      {index !==
                        (Array.isArray(data?.movieDetail?.categoriesvi)
                          ? data?.movieDetail?.categoriesvi
                          : JSON.parse(data?.movieDetail?.categoriesvi || "[]")
                        ).length -
                          1 && ", "}
                    </span>
                  ))}
                </h1>
                <h1 className="text-sm">{data?.movieDetail?.publishyear}</h1>
              </div>
              <p className="my-4 text-gray-400">
                {data?.movieDetail?.description}
              </p>
              <div className="flex flex-row gap-2 items-center">
                <div>Đánh giá:</div>
                <IconStar fill={"#fbbf24"} width={14} height={14} />
                <div className="ml-[2px] text-sm text-amber-400">
                  {Math.round(data?.movieDetail?.avgrating * 10) / 10 || 0.0}
                </div>
              </div>
              <div className="mt-12">
                {data?.list?.length > 0 ? (
                  data?.movieDetail?.type == "movie" ? (
                    <Button
                      className="uppercase"
                      size="lg"
                      variant="shadow"
                      color="danger"
                      startContent={<LineMdPlayFilled />}
                      onClick={() =>
                        directWatchPage(data?.list[0]?.episodenumber)
                      }
                    >
                      Xem ngay
                    </Button>
                  ) : (
                    <>
                      <h1 className="text-sm">Chọn tập phim:</h1>
                      <div className="flex flex-row flex-wrap lg:my-2">
                        {data?.list?.map((item) => (
                          <Button
                            variant="flat"
                            className="m-1"
                            key={item.episodeid}
                            onClick={() => directWatchPage(item.episodenumber)}
                          >
                            Tập {item.episodenumber}
                          </Button>
                        ))}
                      </div>
                    </>
                  )
                ) : (
                  <Button
                    className="uppercase"
                    size="lg"
                    variant="shadow"
                    color="danger"
                    startContent={<SvgSpinnersClock />}
                    onClick={() => {
                      toast("Chương trình sắp ra mắt!");
                    }}
                  >
                    Sắp ra mắt
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="lg:basis-2/3"></div>
        </div>
      </div>
    </Transition>
  );
}
