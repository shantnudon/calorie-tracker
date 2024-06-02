"use client";

import { useState } from "react";
import Loading from "@/components/loader";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const [input, setInput] = useState("");
  const [foodResult, setFoodResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const notify = () => toast("Wow so easy !");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setSearching(true);
      let res = await fetch(
        "https://api.calorieninjas.com/v1/nutrition?query=" + input,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "M8BF3+qa48w3jqz/abmX3g==kbaazbcaxNfg9A1v",
            "Content-Type": "application/json",
          },
        }
      );
      let result = await res.json();
      setFoodResult(result.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFoodResult(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <section className="flex flex-col font-bold">
      <div
        id="left"
        className="text-5xl font-extrabold space-y-8 text-[#009959]"
      >
        <div id="search" className="text-xl py-6">
          <form onSubmit={handleSearch}>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className="py-2 px-3 rounded-md mx-3"
            />
            <input
              type="submit"
              disabled={!input || searching}
              // onClick={handleSearch}
              className={`active:bg-blue-900 py-2 px-3 bg-blue-500 text-white rounded-md mx-3 ${
                searching ? "opacity-50 cursor-not-allowed" : ""
              }`}
              value={searching ? "Searching..." : "Search"}
            />
          </form>

          <button onClick={notify}>Notify !</button>
          <ToastContainer />

          {/* </button> */}
        </div>
      </div>
      <div id="right" className=" flex flex-col text-[#009959]">
        {foodResult ? (
          <>
            <h1 className=" text-3xl text-[#009959]">
              Total nutrients value in {foodResult.name} per 100g
            </h1>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className="flex flex-col text-3xl ">
                <div className="flex justify-between">
                  <label htmlFor="">Calories:</label>
                  <input
                    {...register("calories")}
                    id="calories"
                    value={foodResult.calories}
                    className="bg-transparent"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Carb:</label>
                  <input
                    {...register("carb")}
                    id="carb"
                    value={foodResult.carbohydrates_total_g}
                    className="bg-transparent"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Protien: </label>
                  <input
                    {...register("protien")}
                    id="protien"
                    value={foodResult.protein_g}
                    className="bg-transparent"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Total Fat: </label>
                  <input
                    {...register("fat")}
                    id="fat"
                    value={foodResult.fat_total_g}
                    className="bg-transparent"
                  />
                </div>
              </div>
              <input
                type="submit"
                disabled={!input || searching}
                // onClick={handleSearch}
                className={`active:bg-blue-900 py-2 px-3 bg-blue-500 text-white rounded-md mx-3 ${
                  searching ? "opacity-50 cursor-not-allowed" : ""
                }`}
                value={searching ? "Saving.." : "Save"}
              />
            </form>
          </>
        ) : (
          <div className="flex justify-between">
            {searching ? (
              <Loading />
            ) : (
              <div className="text-white">
                Enter a search term and click Search
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
