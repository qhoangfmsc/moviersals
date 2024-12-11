import getAllCategories from "@/app/api/categories/getAllCategories";
import { Button, Card, CardFooter, Image, Link, Tab, Tabs } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";

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
                            height={150}
                            src={item.thumbnail}
                            width={400}
                          />
                          <CardFooter className="justify-between">
                            <div className="text-white/80">
                              <div className="font-black">{item.name}</div>
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
                              className="text-tiny text-white bg-black/50"
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
