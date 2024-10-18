"use client"

import { LineMdArrowSmallLeft, LineMdPlayFilled, MdiEyeOutline } from "@/components/icons";
import { title } from "@/components/primitives";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DetailPage({
    params
}: {
    params: { id: string }
}) {
    const router = useRouter()

    return (
        <div className="relative min-h-full h-[calc(1000px-8rem)] w-full">
            <div className="absolute" style={{
                left: "0",
                top: "-5rem",
            }}>
                <Image
                    width={5000}
                    height={1000}
                    className="object-cover z-0"
                    alt="thumbnail-valorant"
                    // src="/thumbnail-residentevil.avif"
                    src="/thumbnail-tft.jpg"
                />
            </div>
            <div className="absolute left-0 top-0 flex flex-row w-full h-[1000px]">
                <div className="relative p-16 flex flex-col basis-1/3 bg-black/70">
                    <div className="mb-16">
                        <Button className="rounded-full" size="lg" variant="light" startContent={<LineMdArrowSmallLeft />} onClick={() => router.back()}>Quay lại</Button>
                    </div>
                    <div >
                        <h1 className={title()}>Detail movie {params.id}</h1>
                        <h1 className="text-sm text-gray-400">Nhà sản xuất: <span>Hello World</span></h1>
                        <div className="flex text-tiny text-gray-400">
                            <div className="self-center">
                                <MdiEyeOutline />
                            </div>
                            <div className="self-center">
                                &nbsp; {params.id} lượt xem
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-300 font-black mt-8">
                            <h1 className="text-sm">Khoa học viễn tưởng, Phiêu lưu</h1>
                            <h1 className="text-sm">2024</h1>
                        </div>
                        <p className="my-4 text-gray-400">
                            Chiến thắng rất xứng đáng dành cho Dương Quốc Hoàng, Aloysius Yapp, Johann Chua, Carlo Biado, Ko Pin Yi và đội trưởng Efren Reyes. Aloysius Yapp là tay cơ xuất sắc nhất giải, Hoàng "Sao" đóng góp lớn vào chức vô địch của tuyển châu Á. Mỗi tay cơ dự Reyes Cup nhận 15.000 USD.
                        </p>
                        <div className="mt-12">
                            {(Number(params.id) % 2)
                                ? <Button className="uppercase" size="lg" variant="shadow" color="danger" startContent={<LineMdPlayFilled />}>xem ngay</Button>
                                :
                                <>
                                    <h1 className="text-sm">Chọn tập phim:</h1>
                                    <div className="flex flex-row flex-wrap my-2">
                                        <Button variant="flat" className="m-1">Tập 1</Button>
                                        <Button variant="flat" className="m-1">Tập 2</Button>
                                        <Button variant="flat" className="m-1">Tập 3</Button>
                                        <Button variant="flat" className="m-1">Tập 4</Button>
                                        <Button variant="flat" className="m-1">Tập 5</Button>
                                        <Button variant="flat" className="m-1">Tập 6</Button>
                                        <Button variant="flat" className="m-1">Tập 7</Button>
                                        <Button variant="flat" className="m-1">Tập 8</Button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="basis-2/3"></div>
            </div>
        </div>
    );
}
