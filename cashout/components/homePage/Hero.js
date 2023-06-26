import React from "react";
import { RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "../constants/data";
import Image from "next/image";

export default function Hero() {
  const colors = ["#F59E8B", "#30BB46", "#10B981", "#3B52F6"];
  return (
    <div className="flex flex-row justify-center items-start overflow-hidden">
      {/* Text container */}

      <div className="w-full md:w-1/2 mx-auto text-center md:text-left">
        <RoughNotationGroup show={true}>
          <RainbowHighlight color={colors[0]}>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-700 dark:text-gray-200 my-2">
              We Sell
            </h1>
          </RainbowHighlight>
          <RainbowHighlight color={colors[1]}>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-700 dark:text-gray-200 my-2">
              We Buy
            </h1>
          </RainbowHighlight>
          <RainbowHighlight color={colors[2]}>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-700 dark:text-gray-200 my-2">
              We Build Website
            </h1>
          </RainbowHighlight>
          <RainbowHighlight color={colors[3]}>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-700 dark:text-gray-200 my-2">
              Business Lawd
            </h1>
          </RainbowHighlight>
        </RoughNotationGroup>
      </div>
      {/* Image container */}
      <div className="hidden lg:block relative w-full md:w-1/2 -mr-40 ">
        <div className="w-3/4 ">
          <Image src={userData.avatarUrl} width={userData.width} height={userData.height}  priority alt="img" className=" shadow" />
        </div>
      </div>
    </div>
  );
}
