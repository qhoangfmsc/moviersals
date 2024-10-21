"use client";

import { title } from "@/components/primitives";
import { Button, Card, Image, Input } from "@nextui-org/react";
import { useState } from "react";

export default function TemplatePage() {
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  const handleFileChange = (file: File | undefined) => {
    setFileState(file);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div className="flex flex-col items-center">
        <Card className="relative p-8 lg:mr-12 w-fit text-center overflow-hidden w-[300px]">
          <div
            className="absolute w-full text-2xl shadow-2xl bg-gradient-to-r from-yellow-200 to-orange-400 rotate-45"
            style={{
              top: "1rem",
              right: "-7.75rem",
            }}
          >
            V I P
          </div>
          <h1 className={title()}>Username</h1>
          <h1 className="text-tiny text-gray-400 mb-6">@hashtag</h1>
          <Image
            isBlurred
            width={240}
            src="https://nextui.org/images/album-cover.png"
            alt="NextUI Album Cover"
            className="my-5 rounded-full p-3"
          />
          <Input
            id="fileupload"
            className="mt-8 w-full"
            type="file"
            name="avatar"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
        </Card>
      </div>
      <div className="flex flex-col items-center mt-4 lg:m-0">
        <Card className="flex flex-col justify-between p-8 lg:w-full w-[300px] h-full">
          <div className="lg:min-w-[300px]">
            <h1 className="text-xl">Thông tin người dùng</h1>
            <Input
              className="w-full"
              type="text"
              name="id"
              variant="underlined"
              isDisabled
              label="ID (không thể chỉnh sửa)"
            />
            <Input
              className="w-full"
              type="text"
              name="displayname"
              variant="underlined"
              label="Tên người dùng"
            />
            <Input
              className="w-full"
              type="text"
              name="email"
              variant="underlined"
              label="Email"
            />
            <Input
              className="w-full"
              type="text"
              name="phonenumber"
              variant="underlined"
              label="Số điện thoại"
            />
          </div>
          <div>
            <Button className="w-full mt-4" color="primary">
              Xác nhận thay đổi
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
