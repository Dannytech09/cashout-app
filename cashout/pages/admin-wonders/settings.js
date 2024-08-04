import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import SettingsComp from "@/components/admin/Settings";
import { GetSwitchHandler } from "../api/admin/settings";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
    return {
      props: {},
    };
  }

  try {
    const response = await GetSwitchHandler(ctx);

    const info = response.data;
    const errorMessage = response.error;
    // console.log("getServerSide response", response.error)

    if (response.success === true) {
      return {
        props: {
          data: info,
          error: null,
        },
      };
    } else if (response.error === "Invalid token.") {
      return {
        props: {},
      };
    } else if (response.error) {
      return {
        props: {
          data: null,
          error: errorMessage,
        },
      };
    } else {
      // Handle unexpected cases
      return {
        props: {
          data: null,
          error: "Unexpected error occurred.",
        },
      };
    }
  } catch (error) {
    // console.log("err", error);
    return {
      props: {
        data: null,
        error: error,
      },
    };
  }
}

export default function Settings({ error, data }) {
  return (
    <div>
      <SettingsComp error={error} data={data} />
    </div>
  );
}
