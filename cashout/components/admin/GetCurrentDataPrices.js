import React from "react";
import HeadInPages from "./HeadInPages";

function CurrentDataPrices({ dataInfos }) {
  return (
    <div className="relative">
     <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-md">
          Current Data Prices
          </h1>
      <HeadInPages />
      </div>
      <div className="mt-[12ch]">
        <div className="text-sm m-3 text-center">
          <table className="table-auto w-full">
            <thead className="">
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Network</th>
                <th className="px-4 py-2">Data Volume</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dataInfos.map((ctr) => (
                <React.Fragment key={ctr.network}>
                  {ctr.dataVol.map((data) => (
                    <tr key={data.name} className="border-t">
                      {data.name === ctr.dataVol[0].name && (
                        <td
                          rowSpan={ctr.dataVol.length}
                          className="px-4 py-2 font-medium"
                        >
                          {ctr.network}
                        </td>
                      )}
                      <td className="px-4 py-2">{data.name}</td>
                      <td className="px-4 py-2">{data.amount}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CurrentDataPrices;
