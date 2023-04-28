import React, { useState } from 'react';

export default function BuyData() {

  const networkData = [
    {
      network: "mtn",
      dataVol:  [
        {
          name: "500mb", amount: "100"
        },
        {
          name: "1GB", amount: "200"
        },
      ],
     
    },

    {
      network: "glo",
      dataVol: [
        {
          name: "1GB", amount: "300"
        },
        {
          name: "2GB", amount: "600"
        },
      ],
     
    }
  ];

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [smePlans, setSmePlans] = useState([]);

  const changeNetwork = (e) => {
    setNetwork(e.target.value);
    const selectedNetwork = networkData.find((ctr) => ctr.network === e.target.value);
    setDataVols(selectedNetwork.dataVol);
    setDataVol("--Data Volume--");
    setSmePlans([]);
    setAmount("");
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find((ctr) => ctr.name === e.target.value);
    setSmePlans(selectedDataVol);
    setAmount("");
  };

  // const changeAmount = (e) => {
  //   setAmount(e.target.value);
  // };
  
  return (
    <div className='flex justify-center w-100 h-screen bg-black text-red-300'>
      <div className='mt-5'>
        <h3>Buy Data</h3>
        <select className='form-control' value={network} onChange={changeNetwork}>
          <option>--Choose Network--</option>
          {networkData.map((ctr) => (
            <option value={ctr.network} key={ctr.network}>
              {ctr.network}
            </option>
          ))}
        </select>
        <br />
        <select className='form-control' value={dataVol} onChange={changeDataVol}>
          <option>--Data Volume--</option>
          {dataVols.map((ctr) => (
            <option value={ctr.name} key={ctr.name}>
              {ctr.name}
            </option>
          ))}
        </select>
        <br />
        <input
          placeholder='Phone number'
          className='form-control text-black'
        />
        <br />
        <br />
        <input className='form-control' value={smePlans.amount}/>
        <br />
      </div>
    </div>
  );
}


<!-- 2nd -->
import React, { useState } from 'react';

export default function buyData() {

  const networkData = [
    {
      network: "mtn",
      dataVol:  [
        {
          name: "500mb", amount: "100"
        },
        {
          name: "1GB", amount: "200"
        },
      ],
     
    },

    {
      network: "glo",
      dataVol: [
        {
          name: "1GB", amount: "300"
        },
        {
          name: "2GB", amount: "600"
        },
      ],
     
    }
  ];

  const [network, setNetwork] = useState("--Choose Network--")
  const [dataVol, setDataVol] = useState("--Data Volume--")
  const [amount, setAmount] = useState("")

  // to update data volumes, SME plans, and amounts
  const [dataVols, setDataVols] = useState([]);
  const [smePlans, setSmePlans] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState('');

  const changeNetwork = (e) => {
    setNetwork(e.target.value);
    setDataVols(networkData.find(ctr => ctr.network === e.target.value).dataVol)
  }

  const changeDataVol = (e) => {
    setDataVol(e.target.value)
    setSmePlans(dataVols.find(ctr => ctr.name === e.target.value))
  }

  const changeAmount = (e) => {
    setAmount(e.target.value);
    setSelectedAmount(smePlans.dataVol.find(ctr => ctr.amount === e.target.value).amount)
  }
  
  return (
    <div className=' flex justify-center w-100 h-screen bg-black text-red-300'>
      <div className=' mt-5'>
        <h3>Buy Data</h3>
        <select className='form-control' value={network} onChange={changeNetwork}>
          <option>--Choose Network--</option>
          {networkData.map(ctr => (
            <option key={ctr.network} value={ctr.network}>{ctr.network}</option>
          ))}
        </select>
        <br />
        <select className='form-control' value={dataVol} onChange={changeDataVol}>
          <option>--Data Volume--</option>
          {dataVols.map(ctr => (
            <option key={ctr.name} value={ctr.name}>{ctr.name}</option>
          ))}
        </select>
        <br />
        <br />
        <div>
          <input placeholder='Amount' className='form-control text-black' value={selectedAmount} onChange={changeAmount}/>
        </div>
        <br />
      </div>
    </div>
  )
}


<!-- 3 -->
import React, { useState } from "react";

export default function BuyData() {
  const networkData = [
    {
      network: "mtn",
      dataVol: [
        {
          name: "500mb",
          amount: "100",
        },
        {
          name: "1GB",
          amount: "200",
        },
      ],
    },

    {
      network: "glo",
      dataVol: [
        {
          name: "1GB",
          amount: "300",
        },
        {
          name: "2GB",
          amount: "600",
        },
      ],
    },
  ];

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [smePlans, setSmePlans] = useState([]);
  const [buyData, setBuyData] = useState([]);

  const changeNetwork = (e) => {
    setNetwork(e.target.value);
    const selectedNetwork = networkData.find(
      (ctr) => ctr.network === e.target.value
    );
    setDataVols(selectedNetwork.dataVol);
    setDataVol("--Data Volume--");
    setSmePlans([]);
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find((ctr) => ctr.name === e.target.value);
    setSmePlans(selectedDataVol);
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
    console.log(e.target.value);
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(e.target.value);
  };

  const submit = (e) => {
    try {
      setBuyData(e.target.value);
      console.log(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      value={buyData}
      className="flex justify-center w-100 h-screen bg-black text-red-300"
    >
      <div className="mt-5">
        <h3>Buy Data</h3>
        <select className="form-control" onChange={changeNetwork}>
          <option>--Choose Network--</option>
          {networkData.map((ctr) => (
            <option value={ctr.network} key={ctr.network}>
              {ctr.network}
            </option>
          ))}
        </select>
        <br />
        <select
          className="form-control"
          // value={dataVol}
          onChange={changeDataVol}
        >
          <option>--Data Volume--</option>
          {dataVols.map((ctr) => (
            <option value={ctr.name} key={ctr.name}>
              {ctr.name}
            </option>
          ))}
        </select>
        <br />
        <input
          placeholder="Phone number"
          className="form-control text-black"
          value={phoneNumber}
          onChange={changePhoneNumber}
        />
        <br />
        <h2 className="form-control" onChange={changeAmount} value={amount}>
          {smePlans.amount}
        </h2>
        <br />
        <div className="border text-center hover:cursor-pointer">
          <button value={{ network, dataVol }} onClick={submit}>
            Buy Data
          </button>
        </div>
      </div>
    </form>
  );
}


{
  "networkData": [
    {
      "network": "mtn",
      "dataVol": [
        {
          "name": "500mb",
          "amount": "108"
        },
        {
          "name": "1GB",
          "amount": "200"
        }
      ]
    },
    {
      "network": "glo",
      "dataVol": [
        {
          "name": "1GB",
          "amount": "300"
        },
        {
          "name": "2GB",
          "amount": "600"
        }
      ]
    }
  ]
}


<!-- select data -->
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";

export default function BuyData() {
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [smePlans, setSmePlans] = useState([]);
  const [buyData, setBuyData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/buyData", {
          headers: authHeader(),
        });
        const data = await response.json();
        console.log(data);
        setNetworkData(data.networkData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const changeNetwork = (e) => {
    setNetwork(e.target.value);
    const selectedNetwork = networkData.find(
      (ctr) => ctr.network === e.target.value
    );
    setDataVols(selectedNetwork.dataVol);
    setDataVol("--Data Volume--");
    setSmePlans([]);
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find((ctr) => ctr.name === e.target.value);
    setSmePlans(selectedDataVol);
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
    console.log(e.target.value);
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = {
      network,
      dataVol,
      phoneNumber,
      amount,
    };
    setBuyData(formData);
    console.log(formData);
  };

  return (
    <form
      value={buyData}
      onSubmit={submit}
      className="flex justify-center w-100 h-screen bg-black text-red-300"
    >
      <div className="mt-5">
        <h3>Buy Data</h3>
        <select className="form-control" onChange={changeNetwork}>
          <option>--Choose Network--</option>
          {networkData.map((ctr) => (
            <option value={ctr.network} key={ctr.network}>
              {ctr.network}
            </option>
          ))}
        </select>
        <br />
        <select
          className="form-control"
          onChange={changeDataVol}
          value={dataVol}
        >
          <option>--Data Volume--</option>
          {dataVols.map((ctr) => (
            <option value={ctr.name} key={ctr.name}>
              {ctr.name}
            </option>
          ))}
        </select>
        <br />
        <input
          placeholder="Phone number"
          className="form-control text-black"
          value={phoneNumber}
          onChange={changePhoneNumber}
        />
        <br />
        <h2 className="form-control" onChange={changeAmount} value={amount}>
          {smePlans.amount}
        </h2>
        <br />
        <div className="border text-center hover:cursor-pointer">
          <button>Buy Data</button>
        </div>
      </div>
    </form>
  );
}


<!-- calling post -->
import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import ConfirmDataModal from "@/components/utils/confirmDataModal";
import axios from "axios";

export default function BuyData() {
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [amounts, setAmounts] = useState([])
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buyData, setBuyData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/buyData", {
          headers: authHeader(),
        });
        const res = await response.json();
        console.log(res.networkData);
        setNetworkData(res.networkData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const changeNetwork = (e) => {
    setNetwork(e.target.value);
    const selectedNetwork = networkData.find(
      (ctr) => ctr.network === e.target.value
    );
    if (selectedNetwork) {
      // check if selectedNetwork is undefined. if not checked it will throw an
      // error if user selects a value and later select the default value
      setDataVols(selectedNetwork.dataVol);
    }
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };
  // handle two onchange props
  const handleNetworkAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e)
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find((ctr) => ctr.name === e.target.value);
    // check if selectedDataVol is undefined. if not checked it will throw an
    // error if user selects a value and later select the default value
    if (selectedDataVol) {
      setAmounts(selectedDataVol);
    }
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
  };
  // handle two onchange props
  const handleDataVolAndInputValidation = (e) => {
    changeDataVol(e);
    handleInputField(e)
  };

  const changeAmount = (e) => {
    // setAmount(e.target.value);
    if (network !== "--Choose Network--" && dataVol !== "--Data Volume--") {
      setAmount(e.target.value);
    }
  };
  // handle two onchange props
  const handleAmountAndInputValidation = (e) => {
    changeAmount(e);
    handleInputField(e)
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(e.target.value);
  };
  // handle two onchange props
  const handlePhoneNumberAndInputValidation = (e) => {
    changePhoneNumber(e);
    handleInputField(e)
  };

  const submit = (e) => {
    e.preventDefault();
    if (allSelected) {
      openModal();
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

const API_URL = "http://localhost:4000/purchase/63227db594843737c0769c98";
  const confirmData = ({ network, dataVol, phoneNumber }) => {
    axios
      .post(
        API_URL,
        {
          headers: {
            // Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
          },
        },
        { network, dataVol, phoneNumber },
      
      )
      .then((res) => {
        console.log(res);
         setBuyData(res.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e)
      });
    closeModal();
  };

  function handleInputField() {
    const inputFields = document.querySelectorAll(".input-field");
    let allFormFilled = true;

    inputFields.forEach((input) => {
      if (input.type === "text" && !input.value) {
        allFormFilled = false;
      } else if (
        input.type === "select-one" &&
        input.value === "--Choose Network--"
      ) {
        allFormFilled = false;
      }
    });

    setAllSelected(allFormFilled);
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="flex justify-center w-100 h-screen bg-black text-red-300"
      >
        <div className="mt-5">
          <h3>Buy Data</h3>
          <select
            className="form-control input-field"
            onChange={handleNetworkAndInputValidation}
          >
            <option>--Choose Network--</option>
            {networkData.map((ctr) => (
              <option value={ctr.network} key={ctr.network}>
                {ctr.network}
              </option>
            ))}
          </select>
          <br />
          <select
            className="form-control input-field"
            onChange={handleDataVolAndInputValidation}
            value={dataVol}
          >
            <option>--Data Volume--</option>
            {dataVols.map((ctr) => (
              <option value={ctr.name} key={ctr.name}>
                {ctr.name}
              </option>
            ))}
          </select>
          <br />
          <input
            placeholder="Phone number"
            className="form-control input-field text-black"
            value={phoneNumber}
            onChange={handlePhoneNumberAndInputValidation}
          />
          <br />
          <h2
            className="form-control input-field"
            onChange={handleAmountAndInputValidation}
            value={amount}
          >
            {amounts.amount}
          </h2>
          <br />
          <div className="border text-center hover:cursor-pointer">
            <button disabled={!allSelected} onClick={openModal}>
              Buy Data
            </button>
          </div>
        </div>
      </form>
      <ConfirmDataModal
        network={network}
        dataVol={dataVol}
        phoneNumber={phoneNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
        value={buyData}
      />
    </>
  );
}
