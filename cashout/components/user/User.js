import React from 'react'

export default function User({ user }) {
  return (
    <div>

      {user && (
        <div className="text-center border-4 border-black bg-blue-300 p-5">
          <ul className="text-sm">
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
