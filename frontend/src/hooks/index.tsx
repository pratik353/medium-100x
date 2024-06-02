import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";

export interface Blog {
  title: string;
  content: string;
  id: string;
  author: Author;
}

export interface Author {
  name: string | null;
  id: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { blogs, loading };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { blog, loading };
};
