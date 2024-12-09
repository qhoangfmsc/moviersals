import { Card } from "@nextui-org/react";

export default function NumberStatisticCard({ title, data }: { title: string; data: any }) {
  function getTotalRevenueData() {
    let totalString = "0";
    let total = Number(data) || 0;
    if (total >= 1000000) {
      totalString = `${(total / 1000000).toFixed(1)}M`; // Converts to "1M" or "2.5M"
    } else if (total >= 1000) {
      totalString = `${(total / 1000).toFixed(0)}K`; // Converts to "100K" or "500K"
    }
    return totalString;
  }

  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md h-full w-full p-6">
      <h1 className=" mb-8 font-md text-gray-400 ml-4">{title}</h1>
      <div className="text-2xl font-bold flex justify-end">{getTotalRevenueData()}</div>
    </Card>
  );
}
