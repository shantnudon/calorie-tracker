"use client";
import { useState, useEffect } from "react";
import NavM from "@/components/NavM";
import AddNew from "@/components/addButton";
import Circle from "@/components/circle";

export default function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.authToken && localStorage.email) {
          const data = {
            authToken: localStorage.authToken,
            email: localStorage.email,
          };

          const response = await fetch("http://localhost:6969/authChalak", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
            cache: "default",
          });

          const responseData = await response.json();

          console.log("Response status:", response.status);
          console.log("Response data:", responseData);

          if (response.status === 200) {
            setStatus(200);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Current status:", status);

  if (status === 200) {
    return (
      <>
        <NavM />
        <div className="grid grid-cols-2">
          <div className="border-2 border-bg-white">
            <Circle value={99} />
          </div>
          <div className="border-2 border-bg-white">total all consumed</div>
          <div className="border-2 border-bg-white">
            <AddNew />
          </div>
          <div className="border-2 border-bg-white">hello</div>
        </div>
      </>
    );
  } else {
    return <>Hi</>;
  }
}
