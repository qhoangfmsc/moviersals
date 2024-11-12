"use client"

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
import {
  ArrowDown,
  SearchIcon,
} from "@/components/icons";
import Image from "next/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import checkAuthen from "@/api/account/checkAuthen";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [authentication, setAuthentication] = useState(null);

  useEffect(() => {
    async function fetchAuth() {
      const auth = await checkAuthen();
      setAuthentication(auth);
    }

    fetchAuth();
  }, []);

  const searchInput = (
    <Button variant="light" startContent={<SearchIcon />} />
  );

  return (
    <NextUINavbar className="bg-transparent px-4" maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link href="/">
            <Image
              width={40}
              height={40}
              alt="MoviersalsLogo"
              src="/MoviersalsLogo.jpg"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {authentication
        ? <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                >
                  <User
                    name="Stitch"
                    avatarProps={{
                      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLs9_sqgpyfZetKlY2la20L_seJ95C9ZJhCg&s"
                    }}
                  />
                  <ArrowDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="My account">
                <DropdownItem>Thông tin của tôi</DropdownItem>
                <DropdownItem>Phim của tôi</DropdownItem>
                <DropdownItem className="text-danger" color="danger" href="/login">
                  Đăng xuất
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        : <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                >
                  <User
                    name="Moviegoer"
                    avatarProps={{
                      src: "/user.bmp"
                    }}
                  />
                  <ArrowDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="My account">
                <DropdownItem className="text-success" color="success" href="/login">Đăng nhập</DropdownItem>
                <DropdownItem href="/register">Đăng ký</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      }
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMobileItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={(item.color) ? item.color : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
