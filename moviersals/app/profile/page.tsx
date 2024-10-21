"use client"

import { title } from "@/components/primitives";
import { Image, Input } from "@nextui-org/react";
import { useState } from "react";

export default function TemplatePage() {
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  const handleFileChange = (file: File | undefined) => {
    setFileState(file);
};

  return (
    <div className="flex flex-col self-center">
      <h1 className={title()}>Profile</h1>
      <Image
        isBlurred
        width={240}
        src="https://nextui.org/images/album-cover.png"
        alt="NextUI Album Cover"
        className="my-5 rounded-full"
      />
      <Input
        id="fileupload"
        className="pt-2 w-[250px]"
        type="file"
        name="avatar"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
}
