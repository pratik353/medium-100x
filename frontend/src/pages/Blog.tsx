import React from "react";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Avatar } from "../components/BlogCard";
import Appbar from "../Appbar";
import Skeleton from "../components/Skeleton";

const Blog = () => {
  const params = useParams();

  const { loading, blog } = useBlog({ id: params.id! });

  if (loading) {
    return <div>
      <Appbar/>
      <Skeleton/>
    </div>;
  }

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-12 p-10 gap-4">
        <div className=" col-span-8 ">
          <div className="text-3xl font-extrabold mb-2">{blog?.title}</div>
          <div className="mb-2 text-slate-600">Posted on August 24, 2023</div>
          <div>{blog?.content}</div>
        </div>
        <div className="col-span-4">
          <div>Author</div>
          <div className="flex gap-2 mt-2">
            <div className="flex-1 flex items-center">
              <Avatar size="small" name={blog?.author.name || ""} />
            </div>
            <div>
              <div className="text-xl font-bold">{blog?.author.name}</div>
              <div className="text-sm text-slate-500">
                Master of mirth , purveyor of puns, and the funniest person in
                the kingdom.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
