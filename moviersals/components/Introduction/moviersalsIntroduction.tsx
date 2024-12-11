"use client";

import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import React from "react";

export default function MoviersalsIntroduction() {
  return (
    <div className="relative my-12 lg:my-36">
      <Image
        className="absolute top-0 left-0 z-0"
        src="/image/sundigital.jpeg"
        alt="background"
        width={"100%"}
        style={{ filter: "blur(300px)" }}
      />
      <h1 className="text-center mb-12 text-3xl lg:text-5xl">
        Tại sao nên sử dụng <b>Moviersals</b>?
      </h1>
      <div className="flex flex-col items-center lg:items-start">
        <Card className="relative hidden lg:flex m-2 lg:left-1/4 lg:top-20 text-left max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/image/dev1.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Nguyễn Quốc Hoàng</h4>
                <h5 className="text-small tracking-tight text-default-400">@qhoangfmsc</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 text-small text-default-400">
            <p>Có nhiều thể loại từ Esports đến Phim bộ, có thể thoải mái khám phá các bộ phim yêu thích❤️❤️</p>
          </CardFooter>
        </Card>
        <Card className="relative hidden lg:flex m-2 lg:left-3/4 lg:top-5 text-left max-w-[340px] lg:max-w-[370px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/image/dev2.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Chu Nguyễn Hoàng Sơn</h4>
                <h5 className="text-small tracking-tight text-default-400">@cnhson</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 text-small text-default-400">
            <p>Giao diện thân thiện bắt mắt. Dịch vụ còn có giá cả hợp lý nữaa 🤑</p>
          </CardFooter>
        </Card>
        <Card
          className="relative hidden lg:flex m-2 lg:bottom-5 max-w-[400px]"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}>
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/image/MoviersalsLogo.jpg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Moviersals</p>
              <p className="text-small text-default-500">@moviersals.vercel.app</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="text-sm font-thin">
            <p>😍 Trải nghiệm các bộ phim mới nhất tại Moviersals.</p>
            <br />
            <p>💬 Cùng nhau tận hưởng các phiên livestream và thảo luận trực tiếp, bắt kịp mọi xu hướng phim!</p>
            <br />
            <p>🔥 Hay cùng tham gia những trận đấu Esports không thể rời mắt đầy kịch tính với bạn bè của bạn?</p>
            <br />
            <p>📱 Xem phim đa nền tảng. Xem mọi lúc, xem mọi nơi!</p>
          </CardBody>
          <Divider />
          <CardFooter className="justify-center">
            <Button
              className="uppercase"
              color="success"
              as={Link}
              href="/login">
              {" "}
              Tham gia ngay hôm nay!{" "}
            </Button>
          </CardFooter>
        </Card>
        <Card className="relative flex lg:hidden m-2 lg:bottom-5 max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/image/MoviersalsLogo.jpg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Moviersals</p>
              <p className="text-small text-default-500">@moviersals.vercel.app</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="text-sm font-thin">
            <p>😍 Trải nghiệm các bộ phim mới nhất tại Moviersals.</p>
            <br />
            <p>💬 Cùng nhau tận hưởng các phiên livestream và thảo luận trực tiếp, bắt kịp mọi xu hướng phim!</p>
            <br />
            <p>🔥 Hay cùng tham gia những trận đấu Esports không thể rời mắt đầy kịch tính với bạn bè của bạn?</p>
            <br />
            <p>📱 Xem phim đa nền tảng. Xem mọi lúc, xem mọi nơi!</p>
          </CardBody>
          <Divider />
          <CardFooter className="justify-center">
            <Button
              className="uppercase"
              color="success"
              as={Link}
              href="/login">
              {" "}
              Tham gia ngay hôm nay!{" "}
            </Button>
          </CardFooter>
        </Card>
        <Card className="relative hidden lg:flex m-2 lg:left-1/3 lg:top-5 text-left max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/image/cus1.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Lê Duy Tân</h4>
                <h5 className="text-small tracking-tight text-default-400">@duytann28</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 text-small text-default-400">
            <p>Theo dõi được các trò chơi sớm, không bị bỏ lỡ phần nào. Nói chung là thítttt. 🥰🥰</p>
          </CardFooter>
        </Card>
        <Card className="relative hidden lg:flex m-2 lg:left-2/3 lg:bottom-20 text-left max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/image/cus2.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Thanh Trúc</h4>
                <h5 className="text-small tracking-tight text-default-400">@ntt</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 text-small text-default-400">
            <p>Trang web đẹp, sử dụng cũng dễ nữaaa 🤤🤤</p>
          </CardFooter>
        </Card>
        <Card className="relative hidden lg:flex m-2 lg:left-28 lg:bottom-96 text-left max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="/image/cus3.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">Minh Lê</h4>
                <h5 className="text-small tracking-tight text-default-400">@mint2810</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 text-small text-default-400">
            <p>Có cả mấy phiên live nữa, lạ hơn các trang xem phim khác luôn rồiii 🤷‍♂️</p>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full flex justify-center my-24">
        <Card className="bg-black border-none shadow-none rounded-3xl max-w-[1300px] max-h-[800px]">
          <h1 className="text-center text-tiny lg:text-3xl my-16">
            <b>Moviersals</b> luôn đồng hành <br className="lg:hidden" /> mọi hành trình của bạn yêu 😘
          </h1>
          <video
            id="multideviceesports"
            className="self-center"
            width="80%"
            height="300"
            playsInline
            autoPlay
            // loop
            muted
            preload="metadata"
            controlsList="nodownload">
            <source
              src="/video/multideviceesports.mp4"
              type="video/mp4"
            />
          </video>
        </Card>
      </div>
    </div>
  );
}
