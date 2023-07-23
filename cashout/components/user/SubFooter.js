import React from "react";
import Link from "next/link";

export default function SubFooter() {
  return (
    <div>
      <div className="h-10 text-center text-sm font-extrabold p-2">
        <Link href={"https://facebook.com/wondersdataplug"} target="_blank">
          Developed By: Dannytech {new Date().getFullYear()}
        </Link>
      </div>
    </div>
  );
}
