"use client"

import { videosMockup } from "@/config/videosMockup";
import { Avatar, Card, Divider, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { MingcuteSendFill } from "../icons";

const trendingVideos = videosMockup;

interface Comment {
    id: number;
    name: string;
    publisher: string;
    categories: string[];
    description: string;
    thumbnail: string;
}

export default function MyMoviesComments() {
    // NEW COMMENT
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };
    const onKeyDownComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            sendComment();
        }
    };

    const sendComment = () => {
        if (newComment) {
            const newCommentObj = {
                "id": trendingVideos.length + comments.length,
                "name": "User",
                "publisher": "user",
                "categories": ["action", "science fiction"],
                "description": newComment,
                "thumbnail": "/image/user.bmp"
            };

            // Update the comment list
            setComments([newCommentObj, ...comments]); // Adds to the beginning

            // Clear the textarea after submission
            setNewComment('');
        }
    }

    return (
        <>

            <Textarea
                variant="bordered"
                placeholder="Nhập bình luận của bạn"
                className="mb-4"
                value={newComment}
                onKeyDown={(event) => onKeyDownComment(event)}
                onChange={(event) => onChangeComment(event)}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={() => sendComment()} aria-label="toggle password visibility">
                        <MingcuteSendFill />
                    </button>
                }
            />
            <Divider orientation="horizontal" />
            {comments.map((item) => (
                <div key={item.id}>
                    <div className="mb-4">
                        <div className="flex flex-row my-4 mx-2">
                            <Avatar isBordered className="w-10 h-10 mr-1" src={item.thumbnail} />
                            <div className="flex flex-col mx-4 self-center">
                                <p>{item.name}</p>
                                <p className="text-tiny">@{item.publisher}</p>
                                <p className="text-tiny text-gray-500">Bây giờ</p>
                            </div>
                        </div>
                        <Card className="text-sm p-3 w-fit text-gray-400">{item.description}</Card>
                    </div>
                    <Divider orientation="horizontal" />
                </div>
            ))}
        </>
    );
}