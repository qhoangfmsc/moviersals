"use client";

import { useEffect, useState } from "react";
import getUserFavouriteList from "../api/favourite/getUserFavouriteList";
import { Pagination } from "@nextui-org/react";
import FavouriteCard from "@/components/Card/favouriteCard";

interface CardEpisodeProps {
  movieid: string;
  moviename: string;
  publisher: string;
  publishyear: string;
  thumbnail: string;
  type: string;
  episodeid: string;
  episodenumber: string;
  episodename: string;
  createddate: string;
}

export default function UserFavouritePage() {
  const [userFavList, setUserFavList] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchUserFavList = async () => {
      const response = await getUserFavouriteList(currentPage);
      console.log(response.content);
      setUserFavList(response.content);
    };

    fetchUserFavList();
  }, [currentPage]);

  const handleRemoveFavCard = (movieid: string, episodenumber: string) => {
    setUserFavList((prevCards) => ({
      ...prevCards, // Preserve other properties in the state
      list: prevCards.list.filter((card) => card.movieid !== movieid || card.episodenumber !== episodenumber),
    }));
  };

  return (
    <div className="p-[20px] h-screen w-full">
      <h2 className="text-2xl font-bold mb-4 mt-4">Danh sách yêu thích</h2>
      <div>
        {(userFavList?.list?.length === 0 || userFavList?.list == null) ? (
          <div className="text-xl font-semibold h-[200px] flex justify-center items-center text-gray-700">Chưa có phim trong danh sách yêu thích</div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row flex-wrap gap-8 mx-10 my-10">
              {userFavList?.list?.map((item, index) => (
                <div key={index}>
                  <FavouriteCard
                    cardData={item}
                    onClickRemove={handleRemoveFavCard}
                  />
                </div>
              ))}
            </div>
            {userFavList && userFavList?.total > 1 && (
              <Pagination
                className="w-fit"
                total={userFavList?.total}
                page={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
