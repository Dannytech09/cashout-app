import React from "react";

export default function User({ user }) {
  return (
    <div>
      {user && (
        <div className="text-center border-4 border-black bg-blue-300 p-5">
          <ul className="text-sm">
            <li>
              {" "}
              User ID: &nbsp;
              <span>{user.id || user._id}</span>
            </li>
            <li>
              {" "}
              firstName: &nbsp;
              <span>{user.firstName}</span>
            </li>
            <li>
              lastName: &nbsp;
              <span>{user.lastName}</span>
            </li>
            <li>
              Username: &nbsp;
              {user.username}
            </li>
            {user.phoneNumber && (
              <li>
                Phone Number: &nbsp;
              <span>{user.phoneNumber}</span>
              </li>
            )}
            <li>
              {" "}
              Email: &nbsp;
              <span>{user.email}</span>
            </li>
            <li>
              {" "}
              Wallet Balance: &nbsp;
              <span>{user.balance.$numberDecimal}</span>
            </li>
            <li>
              {" "}
              Blocked: &nbsp;
              <span>{user.blocked.toString()}</span>
            </li>
            <li>
              {" "}
              User&apos;s Account-Type: &nbsp;
              <span> {user.accountType}</span>
            </li>
            <li>
              {" "}
              Bank: &nbsp;
              <span>{user.bank.toString()}</span>
            </li>
            <li>
              {" "}
              Bonus Earned: &nbsp;
              <span>{user.bank.toString()}</span>
            </li>
            <li>
              {" "}
              BVN: &nbsp;
              <span>{user.pInfo?.bvn.toString()}</span>
            </li>
            <li>
              {" "}
              NIN: &nbsp;
              <span>{user.pInfo?.nin.toString()}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
