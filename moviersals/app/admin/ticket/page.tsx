"use client"

import { title } from "@/components/primitives";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function MovieAdminPage() {
  return (
    <div>
      <h1 className={title()}>Quản lý hạng vé</h1>
      <Breadcrumbs
        className="my-4"
        itemClasses={{
          item: "px-2",
          separator: "px-0",
        }}
      >
        <BreadcrumbItem href="/admin">Moviersals</BreadcrumbItem>
        <BreadcrumbItem href="/admin/ticket">Hạng vé</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}