"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  const dataGaya = async (url, data) => {
    // console.log(data)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
<<<<<<< HEAD
        cache: "default",
=======
>>>>>>> a844950bc4e9de51520bfd11a2883bc61302ea69
      });
      const responseData = await response.json();
      // console.log(responseData); 
      localStorage.setItem("authToken",responseData.authToken)
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const onSubmitLogin = async (data) => {
    const url = "http://localhost:6969/loginUser"; // Adjust URL as needed
    await dataGaya(url, data);
  };
  const onSubmitRegister = async (data) => {
    const url = "http://localhost:6969/registerUser"; // Adjust URL as needed
    await dataGaya(url, data);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case "login":
        return (
          <>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="p-4 text-2xl">
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="email" className="text-[#009959] font-semibold">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="password" className=" text-[#009959] font-semibold">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex">
                  <input
                    type="submit"
                    className="cursor-pointer text-lg my-2 transition-all bg-blue-500 text-white p-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  />
                </div>
              </div>
            </form>
          </>
        );
      case "signup":
        return (
          <>
          <form onSubmit={handleSubmit(onSubmitRegister)}>
              <div className="p-4 text-2xl">
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="name" className=" text-[#009959] font-semibold">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="email" className="text-[#009959] font-semibold">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="password" className=" text-[#009959] font-semibold">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex">
                  <input
                    type="submit"
                    className="cursor-pointer text-lg my-2 transition-all bg-blue-500 text-white p-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  />
                </div>
              </div>
            </form>
          </>
        );
      default:
        console.log("Unexpected activeForm value:", activeForm);
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-2xl">
      <div className="w-full max-w-md rounded-lg shadow-md overflow-hidden glass">
        <div className="flex items-center justify-between px-4 py-3 ">
          <h1 className="font-bold text-white">Hi, Friend.</h1>
          <div className="flex items-center space-x-2">
            <button
              className={`p-2 rounded-md text-sm font-medium ${
                activeForm === "login"
                  ? "text-indigo-600 bg-indigo-100"
                  : "text-gray-500"
              }`}
              onClick={() => handleFormSwitch("login")}
            >
              Login
            </button>
            <button
              className={`p-2 rounded-md text-sm font-medium ${
                activeForm === "signup"
                  ? "text-indigo-600 bg-indigo-100"
                  : "text-gray-500"
              }`}
              onClick={() => handleFormSwitch("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className={`transition duration-300 ease-in-out `}>
          {renderForm(activeForm)}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
