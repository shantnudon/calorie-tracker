"use client";

import React, { useRef, useState } from "react";
import YesToAiSearch from "@/components/yesToAiSearch";

const AddButton = () => {
  const [yesAi, setYesAi] = useState(null);
  const [yesManual, setYesManual] = useState(null);

  // modal logic
  const modalRef = useRef(null);
  const closeModal = () => {
    document.getElementById("ptaNahiModal").close();
    setYesAi(null);
    setYesManual(null);
  };
  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const handleYesToAI = () => {
    setYesAi(true);
    setYesManual(false);
  };

  const handleNoToManual = () => {
    setYesManual(true);
    setYesAi(false);
  };

  return (
    <>
      <button
        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        title="Add New"
        onClick={() => modalRef.current.showModal()}
      >
        <svg
          className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
          viewBox="0 0 24 24"
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeWidth="1.5"
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          ></path>
          <path strokeWidth="1.5" d="M8 12H16"></path>
          <path strokeWidth="1.5" d="M12 16V8"></path>
        </svg>
      </button>
      <dialog
        id="ptaNahiModal"
        className="p-4 glass h-96 w-auto"
        ref={modalRef}
        onClick={handleOverlayClick}
      >
        {!yesAi && !yesManual && (
          <>
            <h1>
              Do you want to use AI or you want to enter details manually?
            </h1>
            <>
              <button
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={handleYesToAI}
              >
                AI
              </button>
              <button
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={handleNoToManual}
              >
                Manually
              </button>
            </>
          </>
        )}

        {yesAi && (
          <>
            <YesToAiSearch />
          </>
        )}

        {yesManual && (
          <div>
            <h2>Manual Form</h2>
          </div>
        )}

        <div className="p-2 cursor-pointer text-blue-600" onClick={closeModal}>
          Close
        </div>
      </dialog>
    </>
  );
};

export default AddButton;
