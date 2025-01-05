import ReviewMovieCard from "../Card/reviewMovieCard";

interface CardEpisodeProps {
  dataVideos: Record<string, any>;
  onCardClick?: () => void;
}

export default function ReviewMovieList({ dataVideos, onCardClick }: CardEpisodeProps) {
  return dataVideos?.length > 0 ? (
    dataVideos?.map(function (item) {
      return (
        <div key={item.id}>
          <ReviewMovieCard
            cardData={item}
            onCardClick={onCardClick}
          />
        </div>
      );
    })
  ) : (
    <div className="text-4xl  dark:text-gray-700 p-10 w-full text-center">Không có kết quả tìm kiếm</div>
  );
}
