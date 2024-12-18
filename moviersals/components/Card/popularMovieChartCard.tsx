import { Button, Card } from "@nextui-org/react";
import CustomBarChart from "../Chart/customBarChart";
import MostSeenMovieModal from "../Modal/mostSeenMovieModal";
import { useState } from "react";

export function PopularMovieChartCard({ chartData }: { chartData: any }) {
  const barChartProps = {
    isDarkMode: true,
    width: 600,
    height: 300,
    hoverLabel: "Lượt xem",
    data: chartData,
  };

  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md w-full h-full p-6">
      <div className="flex flex-row justify-between">
        <h1 className=" mb-8 font-md text-gray-400 ml-4">{"Lượt xem nhiều nhất/phim"}</h1>
        <MostSeenMovieModal />
      </div>
      <div className="flex flex-row justify-center mt-2">
        <CustomBarChart chartProps={barChartProps} />
      </div>
    </Card>
  );
}
