import React from "react";
import { Avatar } from "./components/BlogCard";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-2">
      <Link className="flex items-center" to={"/blogs"}>
        <div>Medium</div>
      </Link>
      <div>
        <Link to={"/new"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>

        <Avatar size="big" name="Pratik " />
      </div>
    </div>
  );
};

export default Appbar;
