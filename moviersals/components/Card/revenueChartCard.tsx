"use client";
import CustomLineChart from "@/components/Chart/customLineChart";
import { Button, Card, DatePicker, DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import getDateRangeRevenue from "@/app/api/statistic/getDateRangeRevenue";

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

export default function RevenueChartCard({ chartData }: { chartData: any }) {
  const isDarkMode = true;
  const [revenueDateTime, setRevenueDateTime] = useState<any>({
    startdate: getCurrentMonthDates().startDate,
    enddate: getCurrentMonthDates().endDate,
  });
  const [data, setData] = useState<any>(null);

  async function getDateTimeRevenueData(dataObject: Object) {
    const response = await getDateRangeRevenue(dataObject);
    if (response.status == "success") setData(response.content.list);
  }

  useEffect(() => {
    getDateTimeRevenueData(revenueDateTime);
  }, []);

  const chartProps = {
    isDarkMode: isDarkMode,
    width: 600,
    height: 300,
    hoverLabel: "Doanh thu",
    data: chartData ? chartData : data,
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
    getDateTimeRevenueData(revenueDateTime);
  }

  return (
    <Card className="border border-[#ffffff0f] bg-[#ffffff0f] rounded-md w-full h-full p-6">
      <h1 className=" mb-8 font-md text-gray-400 ml-4">Doanh thu theo ngày</h1>
      <div className="mt-2">
        <CustomLineChart chartProps={chartProps} />
      </div>
      <div className="flex flex-row gap-4 p-4 justify-center my-auto">
        <DatePicker
          variant="bordered"
          className="max-w-[150px]"
          label="Ngày bắt đầu"
          onChange={(value) => handleDateChange("startdate", value)}
        />
        <DatePicker
          variant="bordered"
          className="max-w-[150px]"
          label="Ngày kết thúc"
          onChange={(value) => handleDateChange("enddate", value)}
        />

        <Button
          className="w-fit h-[56px]"
          color="primary"
          onClick={handleRevenueDateClick}>
          Chọn
        </Button>
      </div>
    </Card>
  );
}
