import { getUserIdAndToken } from "@/Utils/authCookies";
import API_BASE_URL from "@/apiConfig";
import To12HourFormat from "@/components/utils/Time";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BASE_URL = `${API_BASE_URL}`;

export default function DetailsPage({ data }) {
  // console.log("details page:", data);

  const email = `${data.email}`;
  const hideEmail = `***${email.slice(3)}`;

  const handleSaveAsPDF = () => {
    const element = document.getElementById("receipt-container");
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      pdf.save("receipt.pdf");
    });
  };

  const handleExportAsImage = () => {
    const element = document.getElementById("receipt-container");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "receipt.png";
      link.click();
    });
  };

  return (
    <div className="text-sm flex flex-col items-center justify-center h-screen mt-2 mb-2">
      {" "}
      <div
        id="receipt-container"
        className=" p-3 border-2 border-black bg-white rounded-2xl border-dotted lg:max-w-80"
      >
        <h4 className="text-center p-2 uppercase font-sans font-bold">
          Wondersdata Receipt:
        </h4>
        <div className="text-center font-mono p-2">
          <div className="p-2 m2">
            {data.account_name && (
              <p className="truncate">Account Holder: {data.account_name}</p>
            )}
            <h1>Email: {hideEmail}</h1>
          </div>
          <h3 className="text-center mt-2 underline mb-2">
            Transaction Details
          </h3>
          <div className="flex flex-col gap-3">
            {data.product_name && (
              <p>
                Product/Service: <span>{data.product_name}</span>
              </p>
            )}
            {data.package && (
              <p>
                Package: <span>{data.package}</span>
              </p>
            )}
            {data.unique_element && (
              <p>
                Smart Card Number: <span>{data.unique_element}</span>
              </p>
            )}
            {data.phone_number && (
              <p className="">Phone Number: {data.phone_number}</p>
            )}
            {data.amount && (
              <p>
                Amount: <span>{data.amount}</span>
              </p>
            )}
            {data.cashback && (
              <p>
                Cash Back: <span>{data.cashback}</span>
              </p>
            )}
            {data.payment_fee && (
              <p className="">Processing Fee: {data.payment_fee}</p>
            )}
            {data.bank && <p className="">Bank Name: {data.bank}</p>}
            {data.account_number && (
              <p className="">Account Number: {data.account_number}</p>
            )}
            {data.paymentReference && (
              <p className="">Payment Reference: {data.paymentReference}</p>
            )}
            {data.purchased_code && (
              <p className="">
                Token:{" "}
                {data.purchased_code === "" ? "null" : data.purchased_code}
              </p>
            )}
            {data.prevBal && (
              <p>
                Prev Bal: <span>{data.prevBal}</span>
              </p>
            )}
            {data.postBal && (
              <p>
                Post Bal: <span>{data.postBal}</span>
              </p>
            )}
            {data.message && (
              <p>
                Message: <span>{data.message}</span>
              </p>
            )}
            {data.transaction_id && (
              <p>
                Transaction Id: <span>{data.transaction_id}</span>
              </p>
            )}
            {data.transaction_status && (
              <p>
                Transaction Status: <span>{data.transaction_status}</span>
              </p>
            )}
            {data.timestamp && (
              <p>
                Date:{" "}
                <span>
                  {data.timestamp ? To12HourFormat(data.timestamp) : null}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Clicks */}
      <div className="flex justify-center mt-4 ">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-4 text-sm"
          onClick={handleSaveAsPDF}
        >
          Save as PDF
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 text-sm"
          onClick={handleExportAsImage}
        >
          Export as Image
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  //   console.log(id);
  const { token, userId } = getUserIdAndToken(context);

  if (!token) {
    const { res } = context;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  try {
    const apiUrl = `${BASE_URL}/${userId}/getReceipt/${id}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `application/json`,
      },
    });
    // console.log("f", response);

    if (
      response.ok ||
      response.statusText === "OK" ||
      response.status === 200
    ) {
      const resData = await response.json();
      const data = resData?.data;
      // console.log("da", data);
      return {
        props: {
          data,
        },
      };
    } else if (
      response.status === 401 ||
      response.statusText === "Unauthorized"
    ) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    // console.log("err", error)
    return {
      props: {
        notFound: true,
      },
    };
  }
}
