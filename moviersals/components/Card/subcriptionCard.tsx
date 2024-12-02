import { Card, CardFooter, Image, Button, Link, CardHeader } from "@nextui-org/react";

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
  onCardClick: () => void;
}

export default function SubcriptionPlanCard({ data, onCardClick }: SubcriptionProps) {
  function getDiscountPercentage(baseprice, price) {
    return (((Number(baseprice) - Number(price)) / Number(baseprice)) * 100).toPrecision(3);
  }

  return (
    <Card
      key={data.subcriptionid}
      onPress={() => onCardClick()}
      radius="lg"
      className="border-none w-[300px] h-[500px] bg-gradient-to-b from-[#1c1c1c] to-[#333333] p-2 shadow-lg hover:shadow-2xl transition-all overflow-visible">
      <CardHeader>
        {data?.baseprice != data?.price && (
          <p className="text-md text-white bg-orange-700 p-2 rounded-lg inline-block absolute left-[81%] top-[15px] ">
            {`-${getDiscountPercentage(data?.baseprice, data?.price)}%`}
          </p>
        )}
      </CardHeader>
      <div className="flex flex-col text-center h-full">
        {data?.price != "0" ? (
          <div className="h-[150px] pt-6">
            <p className="text-lg font-semibold text-white mb-2">{data?.name}</p>
            <div className="flex flex-row items-center justify-center mt-8 mb-4">
              <p className="text-4xl text-white font-bold p-2 rounded-lg inline-block"> {data?.price}</p>
              <p>₫</p>
            </div>
          </div>
        ) : (
          <div className="h-[150px] py-14">
            <p className="text-4xl font-semibold text-white mb-2">{data?.name}</p>
          </div>
        )}

        <p className="text-sm text-white/70 mb-2 bg-purple-700 py-2 px-4 rounded-lg w-fit mx-auto">
          {data?.daysduration != "0" ? `${Number(data?.daysduration) / 30} months` : "Pernament"}
        </p>
        <CardFooter className="flex flex-col items-start mt-auto">
          <p className="text-sm text-white/70 mb-2">{`Max connection(s): ${data?.connection}`}</p>
          <p className="text-sm text-white/80 mb-4">{`Max quality: ${data?.quality}`}</p>
        </CardFooter>
      </div>
    </Card>
  );
}
