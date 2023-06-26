import userData from "../constants/data";
import React from "react";

export default function Recommendation() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-3xl mx-auto mb-[-5ch] bg-white dark:bg-gray-800">
        <h1 className=" text-3xl md:text-4xl font-bold py-20 text-center md:text-left">
          Recommendations
        </h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
        <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20">
          {/* Experience card */}
          {userData.recommendations.map((idx) => (
            <React.Fragment key={idx.id}>
              <RecommendationCard
                title={idx.title}
                desc={idx.desc}
                year={idx.year}
                company={idx.company}
                companyLink={idx.companyLink}
              />
              {idx.id === userData.recommendations.length - 1 ? null : (
                <div className="divider-container flex flex-col items-center -mt-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                  </div>
                  <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                </div>
              )}
           </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const RecommendationCard = ({ title, desc, year, company, companyLink }) => {
  return (
    <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
      <h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-gray-200 font-bold dark:text-gray-800">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a href={companyLink} className="text-gray-500">
        {company}
      </a>
      <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
    </div>
  );
};
