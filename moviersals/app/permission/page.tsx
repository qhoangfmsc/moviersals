"use client"

import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function TemplatePage() {
  return (
    <Transition>
      <div className="w-full text-center p-20">
        <h1 className={title()}>
          <span className="text-danger">CẢNH BÁO</span>
        </h1>
        <div className="w-3/4 mt-10 justify-self-center">
          <div className="text-3xl">Tài khoản của bạn <u>không phù hợp</u> để vào trang này!</div>
          <br />
          <br />
          <div className="text-3xl mt-10 mb-4">
            Mọi thắc mắc xin liên hệ qua
          </div>
          <Button
            as={Link}
            href="https://mail.google.com/"
            target="_blank"
            className="text-2xl"
            onClick={() => {
              toast.success("Đã sao chép tài khoản Email vào bộ nhớ");
              navigator.clipboard.writeText("moviersals@gmail.com");
            }}
          >
            Email: moviersals@gmail.com
          </Button>
        </div>
      </div>
    </Transition>
  );
}
