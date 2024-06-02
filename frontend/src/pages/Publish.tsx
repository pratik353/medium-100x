import React, { useState } from "react";
import Appbar from "../Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  return (
    <div>
      <Appbar />
      <TextEditor />
    </div>
  );
};

export default Publish;

function TextEditor() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <form className="max-w-screen-md mx-auto mt-4">
        <input
          type="text"
          id="title"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
          <div className="flex items-center h-10 justify-between px-3 py-2 border-b "></div>
          <div className="px-4 py-2 bg-white rounded-b-lg ">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none"
              placeholder="Write an article..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            axios
              .post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
              },
              {
                headers:{
                    Authorization: localStorage.getItem("token")
                }
              })
              .then((res) => {
                navigate(`/blog/${res.data.id}`)
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                alert("Error while creating blog");
              });
          }}
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </form>
    </div>
  );
}
