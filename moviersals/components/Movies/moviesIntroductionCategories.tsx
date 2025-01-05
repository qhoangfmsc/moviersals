import getAllCategories from "@/app/api/categories/getAllCategories";
import { Button, Card, CardFooter, Chip, Image, Link, Tab, Tabs } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { IconStar } from "../icons";

// Video interface with dynamic keys
interface Video {
  id: number;
  movieid: string;
  name: string;
  publisher: string;
  categories: string;
  description: string;
  thumbnail: string;
  [key: string]: any; // Allows any additional dynamic properties
}

// Define the type for the props that the component will receive
interface MoviesCategoriesProps {
  dataVideos: Video[]; // An array of Video objects
}

export default function MoviesIntroductionCategories({ dataVideos }: MoviesCategoriesProps) {
  // CATEGORIES TABS
  const [selected, setSelected] = useState("action");
  const [tags, setTags] = useState<any>(null);

  useEffect(() => {
    async function getAllTags() {
      const response = await getAllCategories(1);
      setTags(response.content.list);
    }

    if (tags == null) getAllTags();
  }, [tags]);

  const handleSelectionChange = (key: Key) => {
    setSelected(String(key));
  };

  return (
    <>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        color="primary"
        variant="underlined"
        size="lg">
        {tags?.map((item) => {
          return (
            <Tab
              key={item.id}
              title={
                <>
                  <div className="hidden lg:flex items-center space-x-2">
                    <span>{item.namevi}</span>
                  </div>
                </>
              }
              className="flex justify-center flex-wrap p-2">
              {dataVideos?.filter((video) => video?.categories?.includes(item.name)).length > 0 ? (
                dataVideos
                  ?.filter((video) => video?.categories?.includes(item.name))
                  ?.map(function (item) {
                    return (
                      <div
                        key={item.id}
                        className="w-fit">
                        <Card
                          isFooterBlurred
                          radius="lg"
                          className="border-none m-1 lg:m-8">
                          <Image
                            alt={item.name}
                            className="object-cover"
                            height={220}
                            src={item.thumbnail}
                            width={450}
                          />
                          <CardFooter className="justify-between">
                            <div className=" dark:text-white/80">
                              <div className="flex flex-row gap-4 my-1 items-center">
                                <div className="font-black">{item.name}</div>
                                <div className="flex flex-row justify-start items-center">
                                  <IconStar
                                    fill={"#fbbf24"}
                                    width={14}
                                    height={14}
                                  />
                                  <div className="ml-[2px] text-sm text-amber-400">{Math.round(item.avgrating * 10) / 10 || 0.0}</div>
                                </div>
                                <Chip
                                  size="sm"
                                  radius="sm"
                                  color={item.ispremium ? "danger" : "primary"}
                                  variant="dot">
                                  {item.ispremium ? "Trả phí" : "Miễn phí"}
                                </Chip>
                              </div>
                              <div className="text-tiny">
                                {(Array.isArray(item?.categoriesvi) ? item.categoriesvi : JSON.parse(item.categoriesvi || "[]"))?.map(
                                  (cat: string, index: number) => (
                                    <span key={index}>
                                      {cat}
                                      {index !==
                                        (Array.isArray(item.categoriesvi) ? item.categoriesvi : JSON.parse(item.categoriesvi || "[]"))
                                          .length -
                                          1 && ", "}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <Button
                              className="text-tiny  dark:text-white bg-black/50"
                              variant="flat"
                              color="default"
                              radius="lg"
                              size="sm"
                              as={Link}
                              href={`/detail/${item.movieid}`}>
                              Xem ngay
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  })
              ) : (
                <h1 className="my-10 text-xl">Chưa có bộ phim nào!</h1>
              )}
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
}
