import { useRef, useState } from "react";
import AiChart from "./aiChart";

const MessageIcon = () => {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
    // setDialogOpen(true);
  };
  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <div className="tw-fixed tw-bottom-[60px] md:tw-bottom-30 tw-right-5 tw-z-50 tw-bg-none">
        {/* Floating Button */}
        <button
          onClick={openDialog}
          className="tw-bg-blue-600 tw-w-12 tw-h-12 tw-rounded-full tw-shadow-lg tw-flex tw-items-center tw-justify-center tw-text-white tw-transition-all "
        >
          <i className="ri-robot-3-line tw-text-xl tw-bg-blue-600"></i>{" "}
          {/* AI icon */}
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className=".no-scrollbar tw-container tw-min-h-[400px] tw-max-w-[850px] tw-max-h-[600px] tw-bg-none tw-p-2"
      >
         <div className="tw-flex tw-justify-end ">
    <button
      onClick={closeDialog}
      className="tw-bg-red-500 tw-text-white tw-rounded-md tw-px-2 tw-py-1 hover:tw-bg-red-600"
    >
      <i className="ri-close-large-line tw-bg-red-500 hover:tw-bg-red-600"></i>
    </button>
  </div>
        <AiChart />
      </dialog>
    </>
  );
};

export default MessageIcon;
