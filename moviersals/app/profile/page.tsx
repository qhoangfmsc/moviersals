"use client";

import { Button, Card, Image, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import checkAuthen from "../api/account/checkAuthen";
import editProfile from "../api/account/editProfile";
import { convertRequestToFormData, preexecuteRequest, showResponseToast } from "@/lib/utils";
import RequestEmailVerification from "../api/account/requestemailverification";
import ConfirmEmailVerification from "../api/account/confirmemailverification";
import Transition from "@/components/MotionFramer/transition";
import moment from "moment";

export default function TemplatePage() {
  const [fileState, setFileState] = useState<File>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isRequestClick, setIsRequestClick] = useState<boolean>(false);
  const emailRef = useRef(null);
  const emailtokenRef = useRef(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const auth = await checkAuthen();
    setUserInfo(auth);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // PROCESS GET DATA
    const formData = new FormData(event.currentTarget);
    const request = {};
    formData.forEach((value, key) => {
      request[key] = value;
    });
    request["thumbnail"] = fileState;

    // PROCESS API
    const payloadFormData = convertRequestToFormData(preexecuteRequest(request));
    const response = await editProfile(payloadFormData);

    // PROCESS NOTIFY
    showResponseToast(response);
  }

  function handleFileChange(file: File | undefined) {
    setFileState(file);

    if (file) {
      if (file) {
        const url = URL.createObjectURL(file);
        setImageSrc(url);
      }
    }
  }

  async function handleRequestEmailVerification() {
    console.log("here");
    const body = { email: emailRef.current.value };
    const result = await RequestEmailVerification(body.email);
    showResponseToast(result);
    if (result.status == "success") {
      setIsRequestClick(true);
    }
  }

  async function handleConfirmEmailVerification() {
    console.log("here");
    const body = { email: emailRef.current.value, emailtoken: emailtokenRef.current.value };
    const result = await ConfirmEmailVerification(body.email, body.emailtoken);
    showResponseToast(result);
    if (result.status == "success") {
      window.location.reload();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Transition>
      <div className="flex flex-col lg:flex-row justify-center">
        <Card className="relative p-8 lg:mr-12 text-center overflow-hidden w-[300px] justify-between">
          {userInfo?.ispremium ? (
            <div
              className="absolute 
              w-full text-2xl shadow-2xl 
              bg-gradient-to-r from-yellow-600 to-orange-200 
              text-amber-100 font-bold
              rotate-45 
              border-2 border-white"
              style={{
                top: "1.5rem",
                right: "-6.75rem",
              }}>
              Member
            </div>
          ) : (
            <></>
          )}
          <h1 className="break-all text-4xl">{userInfo?.displayname}</h1>
          <Image
            isBlurred
            width={240}
            src={imageSrc || userInfo?.thumbnail || "/image/user.webp"}
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
            <form
              className="lg:min-w-[300px]"
              onSubmit={onSubmit}
              method="POST">
              <h1 className="text-xl font-bold text-warning">Thông tin tài khoản</h1>
              <Input
                isDisabled
                className="w-full my-2"
                type="text"
                variant="underlined"
                label="Tên người dùng"
                value={userInfo?.username}
              />
              <div className="flex flex-row gap-4 w-fit">
                <Input
                  isDisabled
                  className="w-fit"
                  type="text"
                  variant="underlined"
                  label="Gói sử dụng"
                  value={userInfo?.subcriptionid}
                />
                <Input
                  isDisabled
                  className="w-full"
                  type="text"
                  variant="underlined"
                  label="Thời gian hết hạn"
                  value={userInfo?.usingend ? moment(userInfo?.usingend).format("DD/MM/YYYY") : ""}
                />
              </div>
              <div className="flex justify-between">
                {!isRequestClick ? (
                  <Input
                    key="emailstatus"
                    ref={emailRef}
                    isDisabled
                    className="w-full my-2"
                    type="text"
                    variant="underlined"
                    label="Trạng thái Email"
                    value={userInfo?.isverified ? "Đã xác thực" : "Chưa xác thực"}
                  />
                ) : (
                  <Input
                    key="emailtoken"
                    ref={emailtokenRef}
                    className="w-2/3 my-2"
                    type="text"
                    variant="underlined"
                    label="Email Token"
                  />
                )}
                {userInfo === null
                  ? null
                  : !userInfo.isverified && (
                      <>
                        {!isRequestClick ? (
                          <Button
                            className="w-fit flex my-auto ml-4"
                            color="default"
                            onClick={handleRequestEmailVerification}>
                            Gửi mã
                          </Button>
                        ) : (
                          <Button
                            className="w-fit flex my-auto ml-4"
                            color="success"
                            onClick={handleConfirmEmailVerification}>
                            Xác nhận
                          </Button>
                        )}
                      </>
                    )}
              </div>
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
                ref={emailRef}
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
              <Button
                className="w-full mt-4"
                color="primary"
                type="submit">
                Xác nhận thay đổi
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Transition>
  );
}
