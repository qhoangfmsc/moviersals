import { Card, CardFooter, Button, CardHeader, Tooltip } from "@nextui-org/react";
import { MageInformationSquareIsSmall, UpsideDownTriangle } from "../icons";

interface SubcriptionProps {
  data: {
    subcriptionid: string;
    name: string;
    price: string;
    daysduration: string;
    connection: string;
    quality: string;
    baseprice: string;
    isads: boolean;
  };
  onCardClick: (data: SubcriptionProps["data"]) => void;
  showButton: boolean;
}

export default function SubcriptionPlanCard({ data, onCardClick, showButton }: SubcriptionProps) {
  const handleSubcriptionClick = () => {
    if (onCardClick) {
      onCardClick(data);
    }
  };

  function getDiscountPercentage(baseprice, price) {
    return (((Number(baseprice) - Number(price)) / Number(baseprice)) * 100).toPrecision(3);
  }

  return (
    <Card
      key={data?.subcriptionid}
      radius="lg"
      className="border-none w-[300px] h-[600px] bg-gradient-to-b from-[#1c1c1c] to-[#141414] p-2 shadow-lg hover:shadow-2xl transition-all overflow-visible">
      <CardHeader>
        {data?.baseprice != data?.price && (
          <p className="text-md text-white bg-orange-700 p-2 rounded-lg inline-block absolute left-[81%] top-[15px] ">
            {`-${getDiscountPercentage(data?.baseprice, data?.price)}%`}
          </p>
        )}
      </CardHeader>
      <div className="flex flex-col text-center h-full">
        {data?.price != "0" ? (
          <div className="h-[140px] pt-6">
            <p className="text-lg text-white">{data?.name}</p>
            <div className="flex flex-row items-center justify-center mt-3 mb-6">
              <p className="text-4xl text-white font-bold p-2 rounded-lg inline-block"> {Number(data?.price).toLocaleString()}</p>
              <p>₫</p>
            </div>
          </div>
        ) : (
          <div className="h-[140px] py-14">
            <p className="text-4xl font-semibold text-white mb-2">MIỄN PHÍ</p>
          </div>
        )}
        <p className="text-md text-white/80 mb-2 bg-purple-700 py-2 px-4 rounded-lg mx-4">
          {data?.daysduration != "0"
            ? Number(data?.daysduration) / 30 > 1
              ? `${Number(data?.daysduration) / 30} tháng`
              : `${Number(data?.daysduration)} ngày`
            : "Không thời hạn"}
        </p>
        <div className="justify-items-start mt-4 mx-3">
          <p className="flex flex-row text-sm text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Số lượng IP: ${data?.connection}`} &nbsp;
            <Tooltip content="Số lượng IP tối đa mỗi tài khoản được sử dụng">
              <span>
                <MageInformationSquareIsSmall />
              </span>
            </Tooltip>
          </p>
          <p className="flex flex-row  text-sm text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Chất lượng: ${data?.quality}`}
          </p>
          <p className="flex flex-row  text-sm text-white/80 mb-4">
            <UpsideDownTriangle /> &nbsp; {`Quảng cáo:  ${data?.isads ? "Có" : "Không"}`}
          </p>
        </div>
        <CardFooter className="flex flex-col items-start mt-auto">
          {showButton && (
            <Button
              onClick={handleSubcriptionClick}
              className="w-full"
              color="primary">
              Chọn
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
