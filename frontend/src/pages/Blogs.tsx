import React from "react";
import BlogCard from "../components/BlogCard";
import Appbar from "../Appbar";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  console.log(blogs);

  if (loading) {
    return (
      <div>
        <Appbar />
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => {
            return (
              <BlogCard
                id={blog.id}
                authorName={blog.author.name}
                publishDate="Dec 3, 2023"
                title={blog.title}
                content={blog.content}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
