"use client";
import { use, useEffect, useState } from "react";
import getCategories from "../api/movies/getCategories";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export default function MovieListPage() {
  const [tags, setTags] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response.status == "success") {
        setSuggestions(response.content);
        setTags(response.content);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="p-[20px] h-screen w-full">
      <CheckboxGroup
        className="flex flex-row flex-wrap gap-8 w-[500px]"
        color="secondary"
        defaultValue={["buenos-aires", "san-francisco"]}
        label="Select cities"
        orientation="horizontal">
        {tags?.map((tag: any) => (
          <Checkbox
            key={tag.name}
            value={tag.name}>
            {tag.namevi}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
