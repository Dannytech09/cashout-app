import React from "react";
import HeadInPages from "./HeadInPages";

function CurrentDataPrices({ dataInfos }) {
  return (
    <div className="relative">
      <HeadInPages />
      <div className="mt-40">
        <div className="text-">
          <table className="table-auto w-full">
            <thead>
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
