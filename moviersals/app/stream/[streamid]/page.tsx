"use client"

import { LineMdArrowSmallLeft, LineMdPlayFilled, MdiEyeOutline } from "@/components/icons";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DetailPage({
    params
}: {
    params: { movieid: string }
}) {
    const router = useRouter()
    const directWatchPage = (episodeid: string) => {
        console.log("watch", episodeid);

        const href = `/detail/${params.movieid}/${episodeid}`;
        router.push(href)
    };

    return (
        <Transition>
            <div className="relative min-h-full h-[calc(1000px-8rem)] w-full">
                <div className="absolute" style={{
                    left: "0",
                    top: "-5rem",
                }}>
                    <Image
                        width={5000}
                        height={1000}
                        className="object-cover z-0"
                        alt="Thumbnail"
                        src="/image/thumbnail-residentevil.avif"
                    />
                </div>
                <div className="absolute left-0 top-0 flex flex-row w-full h-[1000px]">
                    <div className="relative p-10 lg:p-16 flex flex-col lg:basis-1/3 bg-black/70" style={{ backdropFilter: "blur(7px)" }}>
                        <div className="mb-16">
                            <Button className="rounded-full p-0" size="lg" variant="light" startContent={<LineMdArrowSmallLeft />} onClick={() => router.back()}>Quay lại</Button>
                        </div>
                        <div >
                            <h1 className={title()}>Detail movie {params.movieid}</h1>
                            <h1 className="text-sm text-gray-400">Nhà sản xuất: <span>Hello World</span></h1>
                            <div className="flex text-tiny text-gray-400">
                                <div className="self-center">
                                    <MdiEyeOutline />
                                </div>
                                <div className="self-center">
                                    &nbsp; {params.movieid} lượt xem
                                </div>
                            </div>
                            <div className="flex justify-between text-gray-300 font-black mt-8">
                                <h1 className="text-sm">Khoa học viễn tưởng, Phiêu lưu</h1>
                                <h1 className="text-sm">2024</h1>
                            </div>
                            <p className="my-4 text-gray-400">
                                Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng Sao đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.
                            </p>
                            <div className="mt-12">
                                {(Number(params.movieid) % 2)
                                    ? <Button className="uppercase" size="lg" variant="shadow" color="danger"
                                        startContent={<LineMdPlayFilled />}
                                        onClick={() => directWatchPage(params.movieid)}>Xem ngay</Button>
                                    :
                                    <>
                                        <h1 className="text-sm">Chọn tập phim (8/8):</h1>
                                        <div className="flex flex-row flex-wrap lg:my-2">
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 1</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 2</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 3</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 4</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 5</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 6</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 7</Button>
                                            <Button variant="flat" className="m-1" onClick={() => directWatchPage(params.movieid)}>Tập 8</Button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:basis-2/3"></div>
                </div>
            </div>
        </Transition>
    );
}
