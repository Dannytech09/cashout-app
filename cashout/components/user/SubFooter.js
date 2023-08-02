import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SubFooter() {
  return (
    <div>
      <div className="absolute bottom-0 right-0 border border-r-0 border-l-0 bg-white opacity-100 hover:scale-110 skew-y-10 skew-x-2 transition-transform duration-500">
        <Link href="https://wa.me/message/7YDZIMHGFFROD1">
          <Image
            src="/whatsapp.png"
            alt="whatsapp icon"
            width="30"
            height="30"
          />
        </Link>
      </div>
      <div className=" h-10 text-center text-sm font-extrabold p-2 bottom-0">
        <Link href={"https://facebook.com/wondersdataplug"} target="_blank">
          Developed By: Dannytech {new Date().getFullYear()}
        </Link>
      </div>
    </div>
  );
}
