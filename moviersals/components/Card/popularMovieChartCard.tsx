import { Card } from "@nextui-org/react";
import CustomBarChart from "../Chart/customBarChart";

export function PopularMovieChartCard({ chartData }: { chartData: any }) {
  const barChartProps = {
    isDarkMode: true,
    width: 800,
    height: 300,
    hoverLabel: "Lượt xem",
    data: chartData,
  };

  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md w-full h-full p-6">
      <h1 className=" mb-8 font-md text-gray-400 ml-4">{"Lượt xem nhiều nhất"}</h1>
      <div className="mt-2">
        <CustomBarChart chartProps={barChartProps} />
      </div>
    </Card>
  );
}
