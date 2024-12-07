"use client";
import { use, useEffect, useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import getCategories from "../api/movies/getCategories";

export default function MovieListPage() {
  const [tags, setTags] = useState<any>(null);

  const suggestions = [
    { id: "Thailand", text: "Thailand", className: "" },
    { id: "India", text: "India", className: "" },
    { id: "Vietnam", text: "Vietnam", className: "" },
    { id: "Turkey", text: "Turkey", className: "" },
  ];

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      setTags(response.content);
    }

    fetchCategories();
  }, []);

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index: number, newTag: any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag: any) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  return (
    <div className="p-[20px] h-screen w-full">
      <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition="bottom"
          editable
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
        />
      </div>
    </div>
  );
}
