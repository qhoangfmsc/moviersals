"use client";
import { useEffect, useState } from "react";
import { Button, Checkbox, CheckboxGroup, Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import { yearArray } from "./yearMockup";
import getFilterMovie from "../api/movies/getFilterMovie";
import getAllCategories from "../api/categories/getAllCategories";
import { IconComponentBoolean, TablerCalendar } from "@/components/icons";
import ReviewMovieList from "@/components/Movies/reviewMovieList";

interface Filter {
  moviename: string | null;
  year: string | null;
  ispremium: boolean | null;
  categories: string[];
}

const isPremiumOptions = [
  { key: "", id: null, name: "-" },
  { key: "true", id: true, name: "Trả phí" },
  { key: "false", id: false, name: "Miễn phí" },
];

export default function MovieListPage() {
  const [tags, setTags] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>({ moviename: null, year: null, ispremium: null, categories: [] });
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getAllCategories(null);
      if (response?.status == "success") {
        setTags(response.content.list);
      }
    }

    if (tags == null) fetchCategories();
    fetchFilterMovie();
  }, [page]);

  async function fetchFilterMovie() {
    const request = {
      year: filter?.year,
      moviename: filter?.moviename,
      ispremium: filter?.ispremium,
      categories: JSON.stringify(filter?.categories),
      page: page,
    };
    const response = await getFilterMovie(request);
    if (response?.status == "success") {
      setData(response.content);
    }
  }

  return (
    <div className="p-[20px] w-full gap-4">
      <div className="flex flex-col gap-2 rounded p-6 w-full">
        <h1 className="text-4xl mb-2">Tìm kiếm phim</h1>
        <div className="flex flex-row gap-10 p-4 w-full">
          <div className="basis-1/6 w-full">
            <h1 className="text-sm mb-2 ml-2 text-gray-500">Nhập tên phim</h1>
            <Input
              name="moviename"
              placeholder="Nhập tên phim ở đây"
              onChange={(e) => {
                setFilter((prevFilter) => ({ ...prevFilter, moviename: e.target.value }));
              }}
            />
          </div>
          <div className="basis-1/6 w-full">
            <h1 className="text-sm mb-2 ml-2 text-gray-500">Chọn năm sản xuất</h1>
            <Select
              items={yearArray}
              defaultSelectedKeys={[""]}
              startContent={<TablerCalendar />}
              onChange={(e) => {
                setFilter((prevFilter) => ({ ...prevFilter, year: e.target.value }));
              }}>
              {(item) => <SelectItem key={item.key}>{item.name}</SelectItem>}
            </Select>
          </div>
          <div className="basis-1/6 w-full">
            <h1 className="text-sm mb-2 ml-2 text-gray-500">Chọn loại phim</h1>
            <Select
              items={isPremiumOptions}
              defaultSelectedKeys={[""]}
              startContent={<IconComponentBoolean />}
              onChange={(e) => {
                setFilter((prevFilter) => ({ ...prevFilter, ispremium: e.target.value === "true" }));
              }}>
              {(item) => <SelectItem key={item.key}>{item.name}</SelectItem>}
            </Select>
          </div>
          <div className="basis-4/6 w-full">
            <h1 className="text-sm mb-2 text-gray-500">Chọn thể loại</h1>
            <CheckboxGroup
              className="gap-2"
              color="secondary"
              onChange={(e: string[]) => {
                setFilter((prevFilter) => ({ ...prevFilter, categories: e }));
              }}
              orientation="horizontal">
              {tags?.map((tag: any) => (
                <Checkbox
                  key={tag.name}
                  value={tag.name}>
                  {tag.namevi}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <div className="flex mt-6 basis-1/6">
            <Button
              className="w-full"
              size="lg"
              onClick={fetchFilterMovie}
              color="success">
              Phân loại
            </Button>
          </div>
        </div>
      </div>
      <div className="px-10 flex flex-row flex-wrap justify-start m-2">
        <ReviewMovieList dataVideos={data?.list} />
      </div>
      <div className="px-20 flex justify-end">
        <Pagination
          className="w-fit"
          total={data?.total}
          page={page}
          onChange={(e) => {
            setPage(e);
          }}
        />
      </div>
    </div>
  );
}
