import { useState } from 'react';
import API_BASE_URL from "@/apiConfig";
import { getToken } from "../../Utils/Common";
import Loader from '@/components/utils/Loader';
import SidebarAdmin from '@/components/admin/Sidebar-Admin';

const LockData = () => {
  const [variationString, setVariationString] = useState('MTN-SME');
  const [visibility, setVisibility] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVisibilityUpdate = async () => {
    try {
        setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/lock-service`, {
        method: 'PATCH',
        headers: {
            Authorization: "Bearer " + getToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variation_string: variationString,
          visibility: visibility,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
    //   console.error(error);
    throw new Error(`Error: ${error}`);

    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 h-screen p-8">
       {loading && <Loader />}
      <div className='fixed top-0 left-0'>
        <SidebarAdmin />
      </div>
      <p className="mb-4">{message}</p>
      <h1 className='text-center m-5 p-5'>Lock and On Data Services</h1>
      <div className='justify-center text-center'>
        <div>
      <select
        className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
        value={variationString}
        onChange={(e) => setVariationString(e.target.value)}
      >
        <option value="MTN-SME">MTN-SME</option>
        <option value="MTN-CG">MTN-CG</option>
        <option value="GLO-CG">GLO-CG</option>
        <option value="AIRTEL-CG">AIRTEL-CG</option>
        <option value="9MOBILE-CG">9MOBILE-CG</option>
      </select>
      </div>
      <div>
      <select
        className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value === 'true')}
      >
        <option value="false">LOCK</option>
        <option value="true">ON</option>
      </select>
      </div>
      </div>
      <div className='text-center '>
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2"
        onClick={handleVisibilityUpdate}
      >
        Lock/On Data
      </button>

      </div>
    </div>
  );
  
  
};

export default LockData;
