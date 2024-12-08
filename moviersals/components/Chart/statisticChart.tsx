"use client";

import dynamic from "next/dynamic";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface StatisticChartProps {
  isDarkMode: boolean;
  width: number;
  height: number;
  data: Record<string, any>[];
}

function StatisticChart({ chartProps }: { chartProps: StatisticChartProps }) {
  return (
    <div>
      <LineChart
        width={chartProps?.width}
        height={chartProps?.height}
        data={chartProps?.data}>
        <CartesianGrid stroke={chartProps?.isDarkMode ? "#333" : "#ccc"} />
        <XAxis
          domain={["auto", "auto"]}
          dataKey={chartProps?.data && Object.keys(chartProps?.data).length > 0 ? Object.keys(chartProps?.data[0])[1] : "null"}
          stroke={chartProps?.isDarkMode ? "#fff" : "#000"}
        />
        <YAxis
          tickFormatter={(tick) => {
            if (tick >= 1000000) {
              return `${(tick / 1000000).toFixed(1)}M`; // Converts to "1M" or "2.5M"
            }
            if (tick >= 1000) {
              return `${(tick / 1000).toFixed(0)}K`; // Converts to "100K" or "500K"
            }
            return tick;
          }}
          stroke={chartProps?.isDarkMode ? "#fff" : "#000"}
        />
        <Tooltip
          label={"Ngày"}
          contentStyle={{
            backgroundColor: chartProps?.isDarkMode ? "#333" : "#fff",
            color: chartProps?.isDarkMode ? "#fff" : "#000",
            borderRadius: "4px",
          }}
        />
        <Line
          type="monotone"
          dataKey={chartProps?.data && Object.keys(chartProps?.data).length > 0 ? Object.keys(chartProps?.data[0])[0] : "null"}
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
}

// Dynamically export the component
export default dynamic(() => Promise.resolve(StatisticChart), { ssr: false });
