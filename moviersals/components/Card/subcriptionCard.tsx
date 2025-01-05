import { Card, CardFooter, Button, CardHeader, Tooltip } from "@nextui-org/react";
import { MageInformationSquareIsSmall, UpsideDownTriangle } from "../icons";
import { toast } from "react-toastify";
import { useState } from "react";

interface SubcriptionProps {
  data: {
    subcriptionid: string;
    name: string;
    price: string;
    daysduration: string;
    connection: string;
    quality: string;
    baseprice: string;
    priority: string;
    isads: boolean;
  };
  onCardClick: (data: SubcriptionProps["data"]) => void;
  userData?: any;
  showButton: boolean;
}

export default function SubcriptionPlanCard({ data, userData, onCardClick, showButton }: SubcriptionProps) {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleSubcriptionClick = () => {
    setIsClick(true);
    const userinfo = localStorage.getItem("userinfo");
    if (userinfo) {
      const user = JSON.parse(userinfo);
      if (user?.id) {
        if (onCardClick) {
          onCardClick(data);
        }
      } else {
        toast.error("Vui lòng đăng nhập trước khi chọn gói!");
      }
    } else {
      toast.error("Vui lòng đăng nhập trước khi chọn gói!");
    }
  };

  function getDiscountPercentage(baseprice, price) {
    return (((Number(baseprice) - Number(price)) / Number(baseprice)) * 100).toPrecision(3);
  }

  return (
    <Card
      key={data?.subcriptionid}
      radius="lg"
      className="border-none w-[300px] h-[600px] dark:bg-gradient-to-b dark:from-[#1c1c1c] dark:to-[#141414] p-2 shadow-lg hover:shadow-2xl transition-all overflow-visible">
      <CardHeader>
        {data?.baseprice != data?.price && (
          <p className="text-md  dark:text-white bg-orange-700 p-2 rounded-lg inline-block absolute left-[81%] top-[15px] ">
            {`-${getDiscountPercentage(data?.baseprice, data?.price)}%`}
          </p>
        )}
      </CardHeader>
      <div className="flex flex-col text-center h-full">
        {data?.price != "0" ? (
          <div className="h-[140px] pt-6">
            <p className="text-lg  dark:text-white">{data?.name}</p>
            <div className="flex flex-row items-center justify-center mt-3 mb-6">
              <p className="text-4xl dark:text-white font-bold p-2 rounded-lg inline-block"> {Number(data?.price).toLocaleString()}</p>
              <p>₫</p>
            </div>
          </div>
        ) : (
          <div className="h-[140px] py-14">
            <p className="text-4xl font-semibold  dark:text-white mb-2">MIỄN PHÍ</p>
          </div>
        )}
        <p className="text-md  dark:text-white/80 mb-2 bg-purple-700 py-2 px-4 rounded-lg mx-4">
          {data?.daysduration != "0"
            ? Number(data?.daysduration) / 30 > 1
              ? `${Number(data?.daysduration) / 30} tháng`
              : `${Number(data?.daysduration)} ngày`
            : "Không thời hạn"}
        </p>
        <div className="justify-items-start mt-4 mx-3">
          <p className="flex flex-row text-sm  dark:text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Số lượng IP: ${data?.connection}`} &nbsp;
            <Tooltip content="Số lượng IP tối đa mỗi tài khoản đồng thời được sử dụng">
              <span>
                <MageInformationSquareIsSmall />
              </span>
            </Tooltip>
          </p>
          <p className="flex flex-row  text-sm  dark:text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Chất lượng: ${data?.quality}`}
          </p>
          <p className="flex flex-row  text-sm  dark:text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Quảng cáo:  ${data?.isads ? "Có" : "Không"}`}
          </p>
          {data?.price == "0" ? (
            <p className="flex flex-row  text-sm  dark:text-white/80 mb-4">
              <UpsideDownTriangle /> &nbsp; {`Loại phim: Miễn Phí`}
            </p>
          ) : (
            <p className="flex flex-row  text-sm  dark:text-white/80 mb-4 text-start">
              <UpsideDownTriangle /> &nbsp; {`Loại phim: Miễn Phí và Trả Phí`}
            </p>
          )}
        </div>
        <CardFooter className="flex flex-col items-start mt-auto">
          {showButton && userData?.priority < data?.priority && (
            <Button
              isLoading={isClick}
              onClick={handleSubcriptionClick}
              className="w-full"
              color="primary">
              Chọn
            </Button>
          )}
          {userData?.priority == data?.priority && (
            <Button
              isDisabled
              variant="bordered"
              className="w-full"
              color="primary">
              Đang sử dụng
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
