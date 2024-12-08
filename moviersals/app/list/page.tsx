"use client";
import { useEffect, useState } from "react";
import { Button, Checkbox, CheckboxGroup, Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import { yearArray } from "./yearMockup";
import getFilterMovie from "../api/movies/getFilterMovie";
import MoviesTop from "@/components/Movies/moviesTop";
import getAllCategories from "../api/categorie/getAllCategories";

interface Filter {
  moviename: string | null;
  year: string | null;
  categories: string[];
}

export default function MovieListPage() {
  const [tags, setTags] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>({ moviename: null, year: null, categories: [] });
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getAllCategories(1);
      if (response.status == "success") {
        setTags(response.content.list);
      }
    }

    if (tags == null) fetchCategories();
    fetchFilterMovie();
  }, [page]);

  async function fetchFilterMovie() {
    const request = { year: filter?.year, moviename: filter?.moviename, categories: JSON.stringify(filter?.categories) };
    console.log(request);
    const response = await getFilterMovie(request);
    if (response.status == "success") {
      setData(response.content);
    }
  }

  return (
    <div className="p-[20px] h-screen w-full gap-4">
      <div className="flex flex-row gap-2 border border-gray-200 rounded p-2 w-fit">
        <div className="flex flex-col gap-4 p-4">
          <Select
            className="w-[140px]"
            items={yearArray}
            onChange={(e) => {
              setFilter((prevFilter) => ({ ...prevFilter, year: e.target.value }));
            }}
            label="Chọn năm">
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </Select>
          <Input
            label="Nhập tên phim"
            className="w-[200px]"
            name="moviename"
            placeholder="Frozen, The Death, Lion King,..."
            onChange={(e) => {
              setFilter((prevFilter) => ({ ...prevFilter, moviename: e.target.value }));
            }}
          />
        </div>
        <CheckboxGroup
          className="flex flex-row flex-wrap gap-2 w-[500px]"
          color="secondary"
          label="Chọn thể loại"
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
      <Button
        onClick={fetchFilterMovie}
        className="mt-2"
        color="success">
        Phân loại
      </Button>

      <div>
        // Hiển thị phim ở đây
        {/* <MoviesTop
          title="Danh sách phim"
          dataVideos={data?.list}
        /> */}
        <Pagination
          className="w-fit"
          total={data?.total}
          page={page}
          onChange={(e) => setPage(e)}
        />
      </div>
    </div>
  );
}
