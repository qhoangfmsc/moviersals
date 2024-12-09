import { Card } from "@nextui-org/react";

export default function TextStatisticCard({ title, data }: { title: string; data: any }) {
  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md h-full w-full p-6">
      <h1 className=" mb-8 font-md text-gray-400 ml-4">{title}</h1>
      <div className="text-2xl font-bold flex justify-end">{data} </div>
    </Card>
  );
}
