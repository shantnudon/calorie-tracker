"use client";

import React, { useState } from "react";

function AuthForm() {
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case "login":
        return <div className="flex flex-col space-y-4 text-black">login</div>;
      case "signup":
        return <div className="flex flex-col space-y-4 text-black">signup</div>;
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
