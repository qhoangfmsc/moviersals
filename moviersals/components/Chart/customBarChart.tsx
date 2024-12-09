"use client";

import dynamic from "next/dynamic";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle } from "recharts";

interface CustomBarChartProps {
  isDarkMode: boolean;
  width: number;
  height: number;
  hoverLabel: string;
  data: Record<string, any>[];
}

function CustomBarChart({ chartProps }: { chartProps: CustomBarChartProps }) {
  return (
    <div>
      {chartProps?.data && Object.keys(chartProps?.data).length > 0 ? (
        <BarChart
          width={chartProps?.width}
          height={chartProps?.height}
          data={chartProps?.data}>
          <CartesianGrid stroke={chartProps?.isDarkMode ? "#333" : "#ccc"} />
          <XAxis
            dataKey={Object.keys(chartProps?.data[0])[0]}
            stroke={chartProps?.isDarkMode ? "#fff" : "#000"}
          />
          <YAxis
            allowDecimals={false}
            dataKey={Object.keys(chartProps?.data[0])[1]}
            stroke={chartProps?.isDarkMode ? "#fff" : "#000"}
          />
          <Tooltip
            cursor={{ fill: "#00000061" }}
            contentStyle={{
              backgroundColor: chartProps?.isDarkMode ? "#333" : "#fff",
              color: chartProps?.isDarkMode ? "#fff" : "#000",
              borderRadius: "4px",
            }}
          />
          <Bar
            dataKey={Object.keys(chartProps?.data[0])[1]}
            name={chartProps?.hoverLabel}
            fill="#8884d8"
          />
        </BarChart>
      ) : (
        <div className="w-[600px] h-[300px] flex justify-center items-center text-xl font-semibold">Không có dữ liệu</div>
      )}
    </div>
  );
}

// Dynamically export the component
export default dynamic(() => Promise.resolve(CustomBarChart), { ssr: false });
