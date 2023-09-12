import React from "react";
import Link from "next/link";
import WhatsappIcon from "../utils/Whatsapp";

export default function Footer() {
  return (
    <div className="">
      <div className="fixed bottom-0 right-1 opacity-100 hover:scale-110 skew-y-10 skew-x-5 transition-transform duration-500">
        <Link href="https://wa.me/message/7YDZIMHGFFROD1">
          <WhatsappIcon />
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
