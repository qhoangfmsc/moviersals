"use client";
import StatisticChart from "@/components/Chart/statisticChart";
import { Button, DatePicker, DateValue } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { use, useEffect, useState } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import getDateRangeRevenue from "@/app/api/statistic/getDateRangeRevenue";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
];

function getCurrentMonthDates() {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad single digit months
    const dd = date.getDate().toString().padStart(2, "0"); // Get day and pad single digit days
    return `${yyyy}-${mm}-${dd}`;
  };
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

export default function ChartPage() {
  const isDarkMode = true; // Example toggle for dark mode (replace with your logic)
  const [revenueDateTime, setRevenueDateTime] = useState<any>({
    startdate: getCurrentMonthDates().startDate,
    enddate: getCurrentMonthDates().endDate,
  });
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function getDateTimeRevenueData() {
      const response = await getDateRangeRevenue(revenueDateTime);
      setData(response.content.list);
    }

    getDateTimeRevenueData();
  }, [revenueDateTime]);

  const chartProps = {
    isDarkMode: isDarkMode,
    width: 800,
    height: 300,
    data: data,
  };

  const formatter = useDateFormatter({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleDateChange = (key: "startdate" | "enddate", value: DateValue) => {
    if (!value) return;
    const formattedDate = formatter.format(value.toDate("Asia/Ho_Chi_Minh"));
    const [month, day, year] = formattedDate.split("/");
    // Convert to "YYYY-MM-DD" format
    const finalFormattedDate = `${year}-${month}-${day}`;
    setRevenueDateTime((prev) => ({
      ...prev,
      [key]: finalFormattedDate,
    }));
  };

  function handleRevenueDateClick() {
    console.log(revenueDateTime);
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-2 w-fit mt-6">
        <div className="flex flex-row gap-4">
          <DatePicker
            className="max-w-[284px]"
            label="Ngày bắt đầu"
            onChange={(value) => handleDateChange("startdate", value)}
          />
          <DatePicker
            className="max-w-[284px]"
            label="Ngày kết thúc"
            onChange={(value) => handleDateChange("enddate", value)}
          />
        </div>

        <Button
          className="w-fit"
          color="primary"
          onClick={handleRevenueDateClick}>
          Chọn
        </Button>
      </div>

      <div className="p-4">
        <StatisticChart chartProps={chartProps} />
      </div>
    </div>
  );
}
