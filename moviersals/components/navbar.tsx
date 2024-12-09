"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ArrowDown, BxsCategory, IcRoundShop, MingcuteVip2Fill } from "@/components/icons";
import Image from "next/image";
import { Avatar, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip, User } from "@nextui-org/react";
import checkAuthen from "@/app/api/account/checkAuthen";
import { useEffect, useState } from "react";
import logout from "@/app/api/account/logout";
import { usePathname, useRouter } from "next/navigation";
import { showResponseToast } from "@/lib/utils";

export const Navbar = () => {
  const router = useRouter();
  const [authentication, setAuthentication] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      fetchAuth();
    };

    handleRouteChange();
  }, [pathname]);

  const fetchAuth = async () => {
    const auth = await checkAuthen();
    setAuthentication(auth);
    localStorage.setItem("userinfo", JSON.stringify(auth));
  };

  async function logoutHandle() {
    const response = await logout();
    showResponseToast(response);
    router.push("/login");
  }

  if (!pathname) return null;

  return (
    <NextUINavbar
      className="bg-transparent px-6 border-b border-[#ffffff36]"
      maxWidth="full"
      position="sticky">
      <NavbarContent
        className="basis-1/5 sm:basis-full gap-8"
        justify="start">
        <NavbarBrand
          as="li"
          className="gap-3 max-w-fit">
          <Link href="/">
            <Image
              width={40}
              height={40}
              alt="MoviersalsLogo"
              src="/image/MoviersalsLogo.jpg"
            />
          </Link>
        </NavbarBrand>
        <NavbarItem isActive={pathname == "/"}>
          <Link
            color={pathname == "/" ? "success" : "foreground"}
            href="/">
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={pathname == "/staticpage" ? "success" : "foreground"}
            href="/staticpage">
            Về chúng tôi
          </Link>
        </NavbarItem>
      </NavbarContent>

      {authentication ? (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end">
          <NavbarItem className="hidden lg:flex">
            <Tooltip content="Khám phá phim">
              <Link href="/categories">
                <Button
                  color={pathname == "/categories" ? "success" : "default"}
                  variant="light"
                  startContent={<BxsCategory />}
                />
              </Link>
            </Tooltip>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Tooltip content="Mua gói thành viên">
              <Link href="/subscription">
                <Button
                  color={pathname == "/subscription" ? "success" : "default"}
                  variant="light"
                  startContent={<IcRoundShop />}
                />
              </Link>
            </Tooltip>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="h-12"
                  variant="light">
                  {authentication.ispremium ? (
                    <Badge
                      className="text-warning"
                      content={<MingcuteVip2Fill />}
                      color="danger"
                      shape="circle"
                      placement="top-right"
                      size="sm">
                      <Avatar
                        isBordered
                        color="default"
                        src={authentication.thumbnail ? authentication.thumbnail : "/image/user.bmp"}
                      />
                    </Badge>
                  ) : (
                    <Avatar
                      isBordered
                      color="default"
                      src={authentication.thumbnail ? authentication.thumbnail : "/image/user.bmp"}
                    />
                  )}
                  <div>{authentication.displayname}</div>
                  <ArrowDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="My account">
                <DropdownItem
                  key="profile"
                  // as={Link}
                  href="/profile">
                  Thông tin của tôi
                </DropdownItem>
                <DropdownItem
                  key="order-history"
                  // as={Link}
                  showDivider
                  href="/order/history">
                  Lịch sử mua hàng
                </DropdownItem>
                <DropdownItem
                  key="favourite"
                  // as={Link}
                  showDivider
                  href="/favourite">
                  Phim của tôi
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  onClick={logoutHandle}>
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end">
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">
                  <User
                    name="Moviegoer"
                    avatarProps={{
                      src: "/image/user.bmp",
                    }}
                  />
                  <ArrowDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="My account">
                <DropdownItem
                  key="login"
                  // as={Link}
                  className="text-success"
                  color="success"
                  href="/login">
                  Đăng nhập
                </DropdownItem>
                <DropdownItem
                  key="register"
                  // as={Link}
                  href="/register">
                  Đăng ký
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent
        className="sm:hidden basis-1 pl-4"
        justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMobileItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={item.color ? item.color : "foreground"}
                href={item.href}
                size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
