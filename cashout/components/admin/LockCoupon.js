import { useState } from "react";
import Loader from "@/components/utils/Loader";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import withAuth from "@/hocs/withAuth";
import { LockCoupon } from "@/pages/api/admin/lockCoupon";

// A
const LockCouponComp = () => {
  const [network, setNetwork] = useState("MTN-Coupon");
  const [visibility, setVisibility] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVisibilityUpdate = async () => {
    try {
      setLoading(true);
      const response = await LockCoupon(network, visibility);

    //   console.log(response);
      setMessage(response.message);
    } catch (error) {
    //   console.error(error);
      if (error.response.message) {
        alert (response.message)
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 h-screen p-8">
      {loading && <Loader />}
      <div className="fixed top-0 left-0">
        <SidebarAdmin />
      </div>
      <p className="mb-4">{message}</p>
      <h1 className="text-center m-5 p-5">Lock and On Data Coupon - 1</h1>
      <div className="justify-center text-center">
        <div>
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={network}
            onChange={(e) => {
                setNetwork(e.target.value)
                console.log(e.target.value)
            }
            }
          >
            <option value="">--Choose Coupon--</option>
            <option value="33">MTN Coupon</option>
          </select>
        </div>
        <div>
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={visibility}
            onChange={(e) => { setVisibility(e.target.value === "true")
              console.log(e.target.value)
            }
        }
          >
            <option value="false">LOCK</option>
            <option value="true">ON</option>
          </select>
        </div>
      </div>
      <div className="text-center ">
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2"
          onClick={handleVisibilityUpdate}
        >
          Lock/On Coupon
        </button>
      </div>
    </div>
  );
};

export default withAuth(LockCouponComp);
