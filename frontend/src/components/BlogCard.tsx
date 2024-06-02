import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string,
  authorName: string | null;
  title: string;
  content: string;
  publishDate: string;
}

const BlogCard = ({
  id,
  authorName,
  content,
  publishDate,
  title,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} >
      <div className="border-b border-slate-300 p-4 pb-4">
        <div className="flex items-center">
          <Avatar size="small" name={authorName || ""} />
          <div className="font-light pl-2 text-sm">{authorName}</div>
          <div className="pl-2">
            <Circle />
          </div>
          <div className="font-extralight pl-2 text-slate-400 text-sm">
            {publishDate}
          </div>
        </div>
        <div className=" text-xl font-semibold">{title}</div>
        <div className="text-md font-extralight">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm font-extralight text-slate-400 pt-3">
          {Math.ceil(content.length / 100)} minutes
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

function Circle() {
  return <div className="h-[2px] w-[2px] rounded-full bg-slate-400"></div>;
}

export function Avatar({
  name,
  size,
}: {
  name: string;
  size: "big" | "small";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-md"
        } font-medium text-gray-600 dark:text-gray-300`}
      >
        {name.charAt(0)}
      </span>
    </div>
  );
}
