"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import getMostSeenMovie from "@/app/api/statistic/getMostSeenMovie";

const sortOptions = [
  { id: false, name: "Tăng dần" },
  { id: true, name: "Giảm dần" },
];

// Update the function to accept props
export default function MostSeenMovieModal(): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState<any>({
    moviename: "",
    descSort: true,
    page: 1,
  });

  useEffect(() => {
    getMostSeenMovieData();
  }, [filter.page]);

  async function getMostSeenMovieData() {
    const body = filter;
    const response = await getMostSeenMovie(body);
    setData(response.content);
  }

  return (
    <div className="w-fit">
      <Button
        size="sm"
        onClick={() => onOpen()}>
        Xem thêm
      </Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <div className="flex flex-col p-4">
                <div className="flex flex-row gap-2 w-full items-center justify-between">
                  <div className="basis-2/6 w-full">
                    <h1 className="text-sm mb-2 ml-2 text-gray-500">Nhập tên phim</h1>
                    <Input
                      name="moviename"
                      placeholder="Tên phim"
                      onChange={(e) => {
                        setFilter((prevFilter) => ({ ...prevFilter, moviename: e.target.value }));
                      }}
                    />
                  </div>
                  <div className="basis-2/6 w-full">
                    <h1 className="text-sm mb-2 ml-2 text-gray-500">Sắp xếp</h1>
                    <Select
                      items={sortOptions}
                      onChange={(e) => {
                        console.log(e.target.value === "true");
                        setFilter((prevFilter) => ({ ...prevFilter, descSort: e.target.value === "true" }));
                      }}>
                      {(item) => <SelectItem>{item.name}</SelectItem>}
                    </Select>
                  </div>
                  <div className="flex mt-6 basis-1/6">
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={getMostSeenMovieData}
                      color="success">
                      Lọc
                    </Button>
                  </div>
                </div>
                <ModalHeader className="flex flex-col gap-1 w-5/6 h-5/6">Lượt xem nhiều nhất</ModalHeader>
                <ModalBody className="flex flex-col justify-center items-center">
                  <Table aria-label="Most Seen Movies">
                    <TableHeader>
                      <TableColumn>Tên Phim</TableColumn>
                      <TableColumn>Tổng lượt xem</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"Chưa có dữ liệu"}>
                      {data?.list?.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell width={"70%"}>{item?.movie_name}</TableCell>
                          <TableCell width={"30%"}>{item?.total_views}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination
                    total={data?.total}
                    initialPage={1}
                    onChange={(page) => setFilter({ ...filter, page: page })}
                  />
                </ModalBody>
              </div>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
}
