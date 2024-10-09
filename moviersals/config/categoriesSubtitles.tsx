import { BookmarkTabs, ClownFace, CrossedSwords, Fire, Ghost, HeartSuit, Rocket, WorldMap } from "@/components/iconsMovieCategories";

export const categoriesSubtitles = {
    "action": {
        name: "action",
        vietsub: "Hành động",
        icon: <CrossedSwords />,
    },
    "science fiction": {
        name: "science fiction",
        vietsub: "Khoa học viễn tưởng",
        icon: <Rocket />,
    },
    "adventure": {
        name: "adventure",
        vietsub: "Phiêu lưu",
        icon: <WorldMap />,
    },
    "comedy": {
        name: "comedy",
        vietsub: "Hài hước",
        icon: <ClownFace />,
    },
    "documentary": {
        name: "documentary",
        vietsub: "Tài liệu",
        icon: <BookmarkTabs />,
    },
    "drama": {
        name: "drama",
        vietsub: "Kịch tính",
        icon: <Fire />,
    },
    "romance": {
        name: "romance",
        vietsub: "Lãng mạn",
        icon: <HeartSuit />,
    },
    "horror": {
        name: "horror",
        vietsub: "Kinh dị",
        icon: <Ghost />,
    },
}