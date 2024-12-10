"use client";

import { showResponseToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userinfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userinfoStr = localStorage.getItem("userinfo");
    if (userinfoStr) {
      const parsedUserinfo = JSON.parse(userinfoStr);
      setUserInfo(parsedUserinfo);
    } else {
      showResponseToast({
        result: "error",
        content: "Vui lòng đăng nhập trước khi thực hiện hành động này!",
      });
      router.push("/login");
    }
  }, [router]);

  if (!userinfo || userinfo.role !== "customer") {
    return null;
  }

  return <section>{children}</section>
}
