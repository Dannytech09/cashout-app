import React from "react";
import Link from "next/link";

export default function SubFooter() {
  return (
    <div>
      <div className="h-10 text-center text-sm font-extrabold p-2">
        <Link href={"https://www.facebook.com/jaywon349"}>
          &copy; Dannytech {new Date().getFullYear()}
        </Link>
      </div>
    </div>
  );
}
