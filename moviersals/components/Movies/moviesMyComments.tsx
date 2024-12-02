"use client";
import { Rating } from "react-simple-star-rating";
import { videosMockup } from "@/config/videosMockup";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { EditIconWithSquare, IconDelete, MingcuteSendFill } from "../icons";
import { showResponseToast } from "@/lib/utils";
import moment from "moment";
import createComment from "@/app/api/comment/createComment";
import editComment from "@/app/api/comment/editComment";
import deleteComment from "@/app/api/comment/deleteComment";

const trendingVideos = videosMockup;

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

export default function MovieMyComment({ movieid, mycomment }: { movieid: string; mycomment: Comment }) {
  // NEW COMMENT
  const [comment, setComment] = useState<Comment>();
  const [newRating, setNewRating] = useState(null);
  const [newComment, setNewComment] = useState(comment?.content || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let userinfo = null;
  if (typeof window !== "undefined") {
    userinfo = JSON.parse(localStorage.getItem("userinfo") || "{}");
  }

  useEffect(() => {
    setComment(mycomment);
    setNewComment(mycomment?.content || "");
    setNewRating(mycomment?.rating || null);
  }, [mycomment]);

  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
  const onKeyDownComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === "Enter") {
      sendComment();
    }
  };

  const handleRatingChanged = (newRating: number) => {
    setNewRating(newRating);
  };

  const handleDeleteComment = async (onClose: () => void) => {
    const response = await deleteComment({ id: comment?.id, movieid: movieid });
    showResponseToast(response);
    setComment(null);
    setNewComment(null);
    setNewRating(null);
    onClose();
  };

  const sendComment = async () => {
    if (newRating != null && newComment) {
      const newCommentObj = {
        id: comment?.id || 0.1,
        userid: userinfo?.id,
        movieid: movieid,
        username: userinfo?.username,
        displayname: userinfo?.displayname,
        content: newComment,
        rating: newRating,
        createddate: moment().format("YYYY-MM-DD HH:mm:ss"),
        thumbnail: userinfo?.thumbnail,
        modifieddate: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      // Update the comment list

      let commentObject = {
        id: null,
        movieid: movieid,
        content: newComment,
        rating: newRating,
      };

      if (!comment.id) {
        const response = await createComment(commentObject);
        showResponseToast(response);
      } else {
        commentObject.id = comment.id;
        const response = await editComment(commentObject);
        showResponseToast(response);
      }
      setComment(newCommentObj); // Adds to the beginning

      // Clear the textarea after submission
      // setNewComment("");
    } else {
      showResponseToast({ content: "Vui liệu đánh giá và nhập bình luận trước khi gửi", status: "fail" });
    }
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <Rating
          size={20}
          onClick={handleRatingChanged}
          initialValue={comment?.rating}
          allowFraction
        />
      </div>
      <div className="mb-4">
        <Textarea
          variant="bordered"
          placeholder="Nhập bình luận của bạn"
          value={newComment || ""}
          onKeyDown={(event) => onKeyDownComment(event)}
          onChange={(event) => onChangeComment(event)}
          endContent={
            !comment?.id ? (
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => sendComment()}
                aria-label="add new comment">
                <MingcuteSendFill />
              </button>
            ) : (
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => sendComment()}
                aria-label="edit comment">
                <EditIconWithSquare />
              </button>
            )
          }
        />
      </div>
      {comment?.id && (
        <div>
          <Divider orientation="horizontal" />
          <div className="my-4 p-2 bg-slate-700/[0.7] rounded-lg">
            <div className="flex flex-row my-4 mx-2">
              <Avatar
                isBordered
                className="w-10 h-10 mr-1"
                src={comment?.thumbnail}
              />
              <div className="flex flex-col mx-4 self-center">
                <p>{comment?.displayname}</p>
                <p className="text-tiny">@{comment?.username}</p>
                <Tooltip
                  content={comment?.createddate}
                  closeDelay={1}
                  placement="bottom-end"
                  color="primary">
                  <p className="text-tiny text-gray-500">{moment().from(comment?.createddate)}</p>
                </Tooltip>
              </div>
              <div className="flex flex-1 justify-end">
                <Rating
                  size={20}
                  allowFraction
                  readonly
                  allowHover={false}
                  disableFillHover
                  initialValue={comment?.rating}
                />
                <div>
                  <Button
                    size="sm"
                    className="ml-4"
                    isIconOnly
                    color="danger"
                    onClick={() => onOpen()}
                    aria-label="delete comment">
                    <IconDelete />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="text-sm p-3 w-fit text-gray-400">{comment?.content}</Card>
          </div>
          <Divider orientation="horizontal" />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Xóa bình luận</ModalHeader>
              <ModalBody>Hành động này sẽ xóa bình luận vĩnh viễn !</ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}>
                  {"Hủy"}
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDeleteComment(onClose);
                  }}>
                  {"Đồng ý"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
