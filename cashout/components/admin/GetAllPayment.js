import React from 'react'
import Link from 'next/link'

export default function AllPayment({ payment }) {
  return (
         <div className="border text-xs h-full border-solid bg-slate-500 border-slate-500 p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ml-4 mr-4 justify-center mt-[15ch] mb-40">
        {payment.map((item) => (
          <div
            key={item._id}
            className="border shadow-md p-3 flex flex-col justify-center flex-wrap"
          >
            <div className="flex hover:pointer hover:text-cyan-500 text-[1.3ch] ">
            ID: <span className="font-medium "> {item.user}</span>
              <Link className=' hover:text-blue-500' href={'/admin/getSingleUser'}><h5 className="font-bold">
                &nbsp; click me</h5>
              </Link>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Full Name:{" "}
                <span className="font-medium">{item.account_name}</span>
              </h1>
            </div>
            {item.account_number && (
                <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Account Number: <span className="font-medium">{item.account_number}</span>
              </h1>
            </div>
            )}
            {item.bank && (
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Bank: <span className="font-medium"> {item.bank}</span>
              </h1>
            </div>
            )}
           <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Email: <span className="font-medium"> {item.email}</span>
              </h1>
            </div>
            {item.paymentReference && (
              <div className="flex-wrap text-[1.3ch]">
                <h1 className="font-bold">
                  Payment Ref: <span className="font-medium"> {item.paymentReference}</span>
                </h1>
              </div>
            )}
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Amount Paid: <span className="font-medium"> {item.amount_payable}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Payment fee: <span className="font-medium"> {item.payment_fee}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                PrevBal: <span className="font-medium"> {item.prevBal}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                PostBal: <span className="font-medium"> {item.postBal}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Payment Type: <span className="font-medium"> {item.purpose}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Ref Number: <span className="font-medium"> {item.reference_number}</span>
              </h1>
            </div>
              <h1 className="font-bold">
                Trnx Time:{" "}
                <span className="font-medium">
                  {" "}
                  {item.timestamp}
                </span>
              </h1>
            </div>
          </div>
        ))}
      </div>
  
  )
}
