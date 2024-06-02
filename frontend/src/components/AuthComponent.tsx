import { SignupInputs } from "@pratikkamble199/medium-common";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";

const AuthComponent = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInputs>({
    email: "",
    password: "",
    name: "",
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`,
        postInputs
      );

      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("Error while signup")
    }
  };

  console.log(postInputs);
  return (
    <div className="h-screen flex justify-center items-center ">
      <div>
        <div className="px-10">
          <div className="text-4xl font-bold text-center">
            {type === "signup" ? "Create an account" : "Login"}
          </div>
          <div className="text-xl text-slate-400 text-center mt-2">
            {type === "signup" ? "Already have account" : "Don't have account"}?{" "}
            <Link
              className="underline text-slate-400"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Login" : "Sign up"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          { type === "signup" && <LabeledInput
            label="Name"
            placeholder="enter your name"
            value={postInputs.name!}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }));
            }}
          />}
          <LabeledInput
            label="Email"
            placeholder="m@example.com"
            value={postInputs.email}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LabeledInput
            label="Password"
            placeholder=""
            type="password"
            value={postInputs.password}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
          <button className="w-full bg-slate-950 text-white" onClick={sendRequest}>
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;

const LabeledInput = ({
  label,
  placeholder,
  onChange,
  value,
  type,
}: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block mb-2 text-sm text-gray-900 font-bold"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={label.toLowerCase()}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
