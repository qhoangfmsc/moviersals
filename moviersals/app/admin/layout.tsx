"use client";

import { showResponseToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [userinfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userinfoStr = localStorage.getItem("userinfo");
    if (userinfoStr) {
      const parsedUserinfo = JSON.parse(userinfoStr);
      setUserInfo(parsedUserinfo);

      if (parsedUserinfo.role !== "admin") {
        showResponseToast({
          result: "error",
          content: "Tài khoản của bạn không phù hợp để vào trang này!",
        });
        router.push("/permission");
      }
    } else {
      showResponseToast({
        result: "error",
        content: "Vui lòng đăng nhập trước khi thực hiện hành động này!",
      });
      router.push("/login");
    }
  }, [router]);

  if (!userinfo || userinfo.role !== "admin") {
    return null;
  }

  return <section className="flex flex-col m-8">{children}</section>;
}
