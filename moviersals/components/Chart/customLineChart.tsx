"use client";

import dynamic from "next/dynamic";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface CustomLineChartProps {
  isDarkMode: boolean;
  width: number;
  height: number;
  hoverLabel: string;
  data: Record<string, any>[];
}

function CustomLineChart({ chartProps }: { chartProps: CustomLineChartProps }) {
  return (
    <div>
      {chartProps?.data && Object.keys(chartProps?.data).length > 0 ? (
        <LineChart
          width={chartProps?.width}
          height={chartProps?.height}
          data={chartProps?.data}>
          <CartesianGrid stroke={chartProps?.isDarkMode ? "#333" : "#ccc"} />
          <XAxis
            dataKey={Object.keys(chartProps?.data[0])[0]}
            stroke={chartProps?.isDarkMode ? "#fff" : "#000"}
          />
          <YAxis
            tickFormatter={(tick) => {
              if (tick >= 1000000) {
                return `${(tick / 1000000).toFixed(1)}M`; // Converts to "1M" or "2.5M"
              } else if (tick >= 1000) {
                return `${(tick / 1000).toFixed(0)}K`; // Converts to "100K" or "500K"
              }
              return tick;
            }}
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
          <Line
            type="monotone"
            name={chartProps?.hoverLabel}
            dataKey={Object.keys(chartProps?.data[0])[1]}
            stroke="#8884d8"
          />
        </LineChart>
      ) : (
        <div className="w-[600px] h-[300px] flex justify-center items-center text-xl font-semibold">Không có dữ liệu</div>
      )}
    </div>
  );
}

// Dynamically export the component
export default dynamic(() => Promise.resolve(CustomLineChart), { ssr: false });
