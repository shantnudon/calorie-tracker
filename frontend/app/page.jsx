"use client"

import Hero from "@/components/Hero";
import NavM from "@/components/NavM";
import { useRef } from "react";
import { useForm } from "react-hook-form"


export default function Home() {


  const modalRef = useRef(null);


  const closeModal = () => {
    document.getElementById("ptaNahiModal").close();
  };

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:6969/insertDataDon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  }
   catch (error) {
    console.error('Error:', error.message);
  }
}


  return (
    <>
      <NavM />
      {/* <div className="container" >
        <div className="grid grid-cols-2 gap-4">
          <div className="border">calorie tracker total cal intake and left and a circle with border showing more thing </div>
          <div className="border">show all macros</div>
          <div className="border">

            
          </div>
          <div className="border">todays intake</div>
      
      
        </div>

        <Hero />
      </div> */}
      <Hero />
      {/* <button
        title="Add New"
        class="group cursor-pointer outline-none hover:rotate-90 duration-300"
        // onClick={() => document.getElementById("ptaNahiModal").showModal()}
        onClick={() => modalRef.current.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke-width="1.5"
          ></path>
          <path d="M8 12H16" stroke-width="1.5"></path>
          <path d="M12 16V8" stroke-width="1.5"></path>
        </svg>
      </button>

      <dialog
        id="ptaNahiModal"
        className="p-4"
        ref={modalRef}
        onClick={handleOverlayClick}
      >new me */}
        {/* <input
                class="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"
                autocomplete="off"
                placeholder="something here"
                name="text"
                type="text"
              /> */}
{/* 

        <div className="p-2" onClick={closeModal}>close kr</div>
      </dialog> */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("meal", { required: true })} className="border-2 text-black"/>
          {/* errors will return when field validation fails  */}
          {errors.meal && <span>This field is required</span>}

          <input type="submit" className="border-2 text-yellow-50"/>
        </form>
    </>
  );
}
