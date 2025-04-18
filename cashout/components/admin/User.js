import React from 'react'

export default function User({ user }) {
  return (
    <div>

      {user && (
        <div className="text-center border-4 border-black bg-blue-300 p-5">
          <ul className="text-sm">
            <li>
              {" "}
              User ID: &nbsp;
              <span>{user._id}</span>
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
              Admin? : &nbsp;
              <span>{user.isAdmin.toString()}</span>
            </li>
            <li>
              {" "}
              Phone Number: &nbsp;
              <span>{user.phoneNumber}</span>
            </li>
            <li>
              {" "}
              User&apos;s Account-Type: &nbsp;
              <span> {user.accountType}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
