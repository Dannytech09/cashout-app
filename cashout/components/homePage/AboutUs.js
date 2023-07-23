import React from "react";
import userData from "../constants/data";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-3xl md:text-4xl font-bold py-20 text-center md:text-left">
          About Us.
        </h1>
      </div>
      <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
        <div className="text-container max-w-6xl mx-auto pt-20">
          <p
            className="leading-loose text-1xl md:text-3xl font-semibold  mx-4"
            style={{ lineHeight: "3rem" }}
          >
            {userData.about.title}.
          </p>
        </div>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
          {/* Social Buttons */}
          <div className="inline-flex flex-col">
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Contact Us
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                For more enquiry, send a{" "}
                <a
                  href={`mailto:${userData.email}`}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  mail
                </a>{" "}
                and we&apos;ll get back to you asap.
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Our Services
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
              - Start enjoying low rates data plan for your internet browsing with conveniency and step up your online world with our quality databundles in no time.
              </p>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
              - Buy airtime on our website with no stress today, we&apos;ve made an online recharge very easy for you. Start enjoying now.
              </p>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
            - We also exchange your airtime with money. This means we can buy your airtime just as you would from us
            </p>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
            - Web development
            </p>
            </div>
            {/* Social Links */}
            <h1 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
              We are Social
            </h1>
            <div className="mt-4 ml-4">
              <div className="flex flex-row justify-start items-center">
                <Link
                  href={userData.socialLinks.twitter} target="_blank"
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    Twitter
                  </div>
                </Link>
              </div>
              <div className="flex flex-row justify-start items-center ">
                <Link
                  href={userData.socialLinks.facebook} target="_blank"
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    Facebook
                  </div>
                </Link>
              </div>
              <div className="flex flex-row justify-start items-center">
                <Link
                  href={userData.socialLinks.linkedin} target="_blank"
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    LinkedIn
                  </div>
                </Link>
              </div>
              <div className="flex flex-row justify-start items-center">
                <Link
                  href={userData.socialLinks.instagram} target="_blank"
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-28 group-hover:translate-x-0 transition duration-300"></div>
                    Instagram
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Text area */}
          <div className="col-span-1 md:col-span-2">
            {userData.about.description?.map((desc, idx) => (
              <p
                key={idx}
                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
              >
                {desc}
              </p>
            ))}

            <h1 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Welcome Note
            </h1>
            <p>We are always glad when new partners get onboard with our platform</p>
            <p>Hence, we welcome you to the best telecommunication platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
