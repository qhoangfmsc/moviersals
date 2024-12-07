"use client";

import BlurCard from "@/components/Card/blurCard";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { adminSectionList } from "@/config/adminSectionList";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function AdminPage() {
  return (
    <Transition>
      <div>
        <h1 className={title()}>
          Quản trị viên <b>Moviersals</b>
        </h1>
        <Breadcrumbs
          className="my-4"
          itemClasses={{
            item: "px-2",
            separator: "px-0",
          }}>
          <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-row flex-wrap gap-8">
          {adminSectionList?.map((item, index) => (
            <div key={index}>
              <BlurCard cardData={item} />
            </div>
          ))}
        </div>
      </div>
    </Transition>
  );
}
