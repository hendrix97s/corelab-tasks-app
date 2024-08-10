import Image from "next/image";
import { memo } from "react";
import Spin from "../icons/spin";

interface LoadingInterface {
  fill?: string;
}

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow bg-shark-950 opacity-60"></div>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow ">
        <div
          className={`flex gap-2 w-full h-full items-center justify-center  z-50 relative`}
        >
          <Spin className="w-40 h-40 -mt-0.5 ml-0.5 animate-spin absolute fill-electric-violet-500/50 transition duration-1000" />
        </div>
      </div>
    </>
  );
};

export default memo(Loading);
