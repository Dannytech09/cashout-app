import { getUserIdAndToken } from "@/Utils/authCookies";
import { useRouter } from "next/router";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/admin`;

export default function InfoPage({ overView, data, referrerInfo }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="h-screen p-3 border-2 border-black">
      <h4 className="text-center p-2 uppercase font-sans font-bold">
        Referrer Info
      </h4>
      <div className="text-center font-mono">
        <div className="p-2 m2">
          <h1>Referrer ID: {id}</h1>
          <p className="text-center mt-2 underline mb-2">Overview</p>
          {overView && (
            <div>
              <p>
                <span>Pending: &nbsp;</span>
                {overView.totalPending}
              </p>
              <p>
                <span>Completed: &nbsp;</span>
                {overView.totalCompleted}
              </p>
              <p>
                <span>Total Person Referred: &nbsp;</span>
                {overView.totalPersonReferred}
              </p>
            </div>
          )}
          <br />
          {referrerInfo.map((me, index) => (
            <div key={index}>
              <p className="text-sm">
                The user, <span className="font-bold">{me.email}</span> with
                username; <span className="font-bold">{me.username} </span> has
                referred these user(s) to wondersdata
              </p>
            </div>
          ))}
        </div>
        {data.map((item, index) => (
          <div className="m-2 p-2" key={index}>
            <span>{index + 1}</span>
            <p className="text-gray-700 font-bold text-[1.5ch]">
              Referred Email: {item.referredEmail}
            </p>

            <p className="text-gray-700 text-[1.4ch]">
              Referred Username: {item.referredUsername}
            </p>
            <p className="text-blue-700 text-[1.3ch]">
              Status: {item.referredStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { token } = getUserIdAndToken(context);

  if (!token) {
    const { res } = context;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
    return { props: {} };
  }

  const apiUrl = `${BASE_URL}/${id}/referralsInfo`;

  // Fetch data for the provided ID using the API route
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `application/json`,
    },
  });
  // console.log(response)

  if (response.ok || response.statusText === "OK" || response.status === 200) {
    const resData = await response.json();
    const overView = resData.data !== undefined ? resData.data : null;
    const data = resData.data.referredDetails;
    const referrerInfo = resData.data.referrerDetails;
    // console.log(resData);
    // console.log(await response.text());
    return {
      props: {
        overView,
        data,
        referrerInfo,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
