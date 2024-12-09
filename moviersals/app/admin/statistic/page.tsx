"use client";
import getOtherStatistic from "@/app/api/statistic/getOtherStatistic";
import NumberStatisticCard from "@/components/Card/numberStatisticCard";
import { PopularMovieChartCard } from "@/components/Card/popularMovieChartCard";

import RevenueChartCard from "@/components/Card/revenueChartCard";
import TextStatisticCard from "@/components/Card/textStatisticCard";
import CustomBarChart from "@/components/Chart/customBarChart";

import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ChartPage() {
  const [data, setData] = useState<any>(null);

  async function getOtherStatisticData() {
    const response = await getOtherStatistic();
    setData(response.content);
  }

  useEffect(() => {
    getOtherStatisticData();
  }, []);

  return (
    <Transition>
      <h1 className={title()}>Thống kê</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}>
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/statistic">Thống kê</BreadcrumbItem>
      </Breadcrumbs>
      <div className="h-screen">
        <div className="w-full h-[580px] flex flex-row gap-4">
          <div className="h-full">
            <RevenueChartCard chartData={null} />
          </div>
          <div className="h-full flex flex-col gap-4">
            <div className="flex flex-row gap-4 h-fit ">
              <NumberStatisticCard
                title={"Tổng doanh thu (₫)"}
                data={data?.list[0]?.total_revenue}
              />
              <TextStatisticCard
                title={"Tổng số khách hàng 👤"}
                data={data?.list[0]?.total_users}
              />
              <TextStatisticCard
                title={"Tổng số đơn hàng 🛒"}
                data={data?.list[0]?.total_orders}
              />
            </div>

            <div className="h-full w-full">
              <PopularMovieChartCard chartData={data?.list[0]?.top5_views} />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
