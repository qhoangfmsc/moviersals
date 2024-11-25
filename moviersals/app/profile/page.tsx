"use client";

import { Button, Card, Image, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import checkAuthen from "../api/account/checkAuthen";
import editProfile from "../api/account/editProfile";
import { showToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TemplatePage() {
  const router = useRouter();
  const [toast, setToast] = useState(<></>);
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const auth = await checkAuthen();
    setUserInfo(auth);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await editProfile(formData);
    const content = response.content
    if (content.toLowerCase().includes("error")) {
      setToast(showToast(content, "error"))
    } else {
      setToast(showToast(content))
    }
  }

  function handleFileChange(file: File | undefined) {
    setFileState(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {toast}
      <div className="flex flex-col lg:flex-row justify-center">
        <Card className="relative p-8 lg:mr-12 text-center overflow-hidden w-[300px] justify-between">
          {(userInfo?.membership == "PREMIUM") ?
            <div
              className="absolute 
              w-full text-2xl shadow-2xl 
              bg-gradient-to-r from-yellow-600 to-orange-200 
              text-amber-100 font-bold
              rotate-45 
              border-2 border-white"
              style={{
                top: "1.75rem",
                right: "-6.5rem",
              }}
            >
              {(userInfo?.membership)}
            </div>
            : <></>
          }
          <h1 className="break-all text-4xl">{userInfo?.displayname}</h1>
          <h1 className="text-tiny text-gray-400 mb-6">@{userInfo?.username}</h1>
          <Image
            isBlurred
            width={240}
            src={(userInfo?.thumbnail) ? userInfo?.thumbnail : "/image/user.bmp"}
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
        <div className="flex flex-col items-center mt-4 lg:m-0">
          <Card className="flex flex-col justify-between p-8 lg:w-full w-[300px] h-full">
            <form className="lg:min-w-[300px]"
              onSubmit={onSubmit}
              method="POST"
            >
              <h1 className="text-xl font-bold text-warning">Thông tin tài khoản</h1>
              <Input
                isDisabled
                className="w-full my-2"
                type="text"
                variant="underlined"
                label="Tên người dùng"
                value={userInfo?.username}
              />
              <Input
                isDisabled
                className="w-full my-2"
                type="text"
                variant="underlined"
                label="Gói sử dụng"
                value={userInfo?.membership}
              />
              <Input
                isDisabled
                className="w-full my-2"
                type="text"
                variant="underlined"
                label="Trạng thái Email"
                value={(userInfo?.isverified) ? "Đã xác thực" : "Chưa xác thực"}
              />
              <h1 className="text-xl mt-4 font-bold text-warning">Thông tin người dùng</h1>
              <Input
                className="w-full my-2"
                type="text"
                name="displayname"
                variant="underlined"
                label="Tên hiển thị"
                value={userInfo?.displayname}
                onChange={handleChange}
              />
              <Input
                className="w-full my-2"
                type="email"
                name="email"
                variant="underlined"
                label="Email"
                value={userInfo?.email}
                onChange={handleChange}
              />
              <Input
                className="w-full my-2"
                type="tel"
                name="phonenumber"
                variant="underlined"
                label="Số điện thoại"
                value={userInfo?.phonenumber}
                onChange={handleChange}
              />
              <Button className="w-full mt-4" color="primary" type="submit">
                Xác nhận thay đổi
              </Button>
            </form>
          </Card>
        </div>
      </div >
    </>
  );
}
