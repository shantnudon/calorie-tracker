"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeForm, setActiveForm] = useState("login");

  const router = useRouter();

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  const dataGaya = async (url, data) => {
    console.log("object");
    if (!data) {
      console.log("no data found");
    }
    // console.log(data)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
        cache: "default",
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.authToken) {
        showToast(responseData.error);
      }
      localStorage.setItem("authToken", responseData.authToken, "email");
      localStorage.setItem("email", responseData.email);
      router.push("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmitLogin = async (data) => {
    const url = "http://localhost:6969/loginUser";
    await dataGaya(url, data);
  };
  const onSubmitRegister = async (data) => {
    const url = "http://localhost:6969/registerUser";
    await dataGaya(url, data);
  };

  // const notify = () => toast("Here is your toast.");

  // Function to display toast based on error message
  const showToast = (errorMessage) => {
    toast.error(errorMessage);
  };

  if (errors && errors.email) {
    showToast("Email is required");
  }

  if (errors && errors.password) {
    showToast("Password is required");
  }

  const renderForm = (formType) => {
    switch (formType) {
      case "login":
        return (
          <>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="p-4 text-2xl">
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-[#009959] font-semibold"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="password"
                    className=" text-[#009959] font-semibold"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", { required: true })}
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
                {/* {errors.email && showToast("Email is required")}
                {errors.password && showToast("Password is required")} */}
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
                  <label
                    htmlFor="name"
                    className=" text-[#009959] font-semibold"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-[#009959] font-semibold"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-white mb-2 placeholder:text-[#009959] focus:outline-none text-[#009959] placeholder:text-base"
                  />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="password"
                    className=" text-[#009959] font-semibold"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", { required: true })}
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
                {/* {errors.exampleRequired && showToast("Email is required")} */}
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
    <>
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
    </>
  );
}

export default AuthForm;
