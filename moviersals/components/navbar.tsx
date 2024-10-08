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

export const Navbar = () => {
  const searchInput = (
    <Button variant="light" startContent={<SearchIcon />} />
  );

  return (
    <NextUINavbar className="bg-transparent px-4" maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Image
            width={40}
            height={40}
            alt="MoviersalsLogo"
            src="/MoviersalsLogo.jpg"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
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
              <DropdownItem key="copy">Thông tin của tôi</DropdownItem>
              <DropdownItem key="new">Phim của tôi</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
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
