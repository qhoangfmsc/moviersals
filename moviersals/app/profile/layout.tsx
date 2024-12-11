"use client";

import { showResponseToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileLayout({
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

  if (!userinfo) {
    return null;
  }

  return <section className="flex flex-col gap-4 py-8 md:py-10">{children}</section>
}
