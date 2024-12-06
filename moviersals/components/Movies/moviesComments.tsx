"use client";

import { videosMockup } from "@/config/videosMockup";
import { Avatar, Card, Divider, Tooltip } from "@nextui-org/react";
import moment from "moment";
import { Rating } from "react-simple-star-rating";

// const trendingVideos = videosMockup;

interface Comment {
  id: number;
  userid: string;
  movieid: string;
  username: string;
  displayname: string;
  content: string;
  rating: number;
  createddate: string;
  modifieddate: string;
  thumbnail: string;
}

export default function MovieComments({ commentList }: { commentList: Comment[] }) {
  return (
    <>
      {commentList?.map((item, index) => (
        <div key={item.id}>
          <Divider orientation="horizontal" />
          <div className="my-4 p-2">
            <div className="flex flex-row my-4 mx-2">
              <Avatar
                isBordered
                className="w-10 h-10 mr-1"
                src={item?.thumbnail}
              />
              <div className="flex flex-col mx-4 self-center">
                <p>{item?.displayname}</p>
                <p className="text-tiny">@{item?.username}</p>
                <Tooltip
                  content={item?.createddate}
                  closeDelay={1}
                  placement="bottom-end"
                  color="primary">
                  <p className="text-tiny text-gray-500">{moment(item?.createddate).fromNow()}</p>
                </Tooltip>
              </div>
              <div className="flex flex-1 justify-end mr-11">
                <Rating
                  size={20}
                  allowFraction
                  readonly
                  allowHover={false}
                  disableFillHover
                  initialValue={item?.rating}
                />
              </div>
            </div>

            <Card className="text-sm p-3 w-fit text-gray-400">{item?.content}</Card>
          </div>
          <Divider orientation="horizontal" />
        </div>
      ))}
    </>
  );
}
