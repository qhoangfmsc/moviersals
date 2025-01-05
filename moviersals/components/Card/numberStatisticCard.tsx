import { Card } from "@nextui-org/react";

export default function NumberStatisticCard({ title, data }: { title: string; data: any }) {
  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md h-auto w-full p-6">
      <h1 className=" mb-8 font-md  dark:text-gray-400 ml-4">{title}</h1>
      <div className="text-2xl font-bold flex justify-end">{Number(data)?.toLocaleString()} VNĐ</div>
    </Card>
  );
}
