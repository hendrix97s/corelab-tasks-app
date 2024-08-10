import Image from "next/image";
import { memo } from "react";
import Spin from "../icons/spin";
import Corelab from "../icons/corelab";
import CorelabLogo from "../icons/corelab-logo";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 flex w-full h-full  bg-shark-950/5 "></div>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow ">
        <div
          className={`flex gap-2 w-full h-full items-center justify-center  z-50 relative`}
        >
          <CorelabLogo className="w-20 h-20 -mt-0.5 ml-0.5   fill-electric-violet-500 absolute flex flex-col items-center justify-center animate-pulse transition duration-1000" />
        </div>
      </div>
    </>
  );
};

export default memo(Loading);
