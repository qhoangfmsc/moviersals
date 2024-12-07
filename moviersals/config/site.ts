export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Moviersals",
  description: "Trang web xem phim trực tuyến",
  navMobileItems: [
    {
      label: "Trang chủ",
      color: undefined,
      href: "/",
    },
    {
      label: "Tìm kiếm",
      color: undefined,
      href: "/search",
    },
    {
      label: "Đăng nhập",
      color: undefined,
      href: "/login",
    },
    {
      label: "Đăng ký",
      color: undefined,
      href: "/register",
    },
  ],
  navLoggedInMobileItems: [
    {
      label: "Trang chủ",
      color: undefined,
      href: "/",
    },
    {
      label: "Tìm kiếm",
      color: undefined,
      href: "/search",
    },
    {
      label: "Thông tin của tôi",
      color: undefined,
      href: "/profile",
    },
    {
      label: "Phim của tôi",
      color: undefined,
      href: "/favourite",
    },
    {
      label: "Logout",
      color: "danger",
      href: "/logout",
    },
  ]
};
