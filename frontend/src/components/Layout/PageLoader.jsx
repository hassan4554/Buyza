import React from "react";
import Lottie from "react-lottie";
import animationData from "../../animations/loading.json";

const PageLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white/35 z-50">
      <div className="w-full h-screen flex items-center justify-center">
        <Lottie options={defaultOptions} width={300} height={300} />
      </div>
    </div>
  );
};

export default PageLoader;
