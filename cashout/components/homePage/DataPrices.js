import React from 'react';

const DataVolumeTable = () => {
  const data = [
    { network: 'MTN-SME', dataVolume: '1GB', amount: 220 },
    { network: 'MTN-CG', dataVolume: '1GB', amount: 235 },
    { network: 'GLO-CG', dataVolume: '1GB', amount: 230 },
    { network: 'AIRTEL-CG', dataVolume: '1GB', amount: 240 },
    { network: '9MOBILE-CG', dataVolume: '1GB', amount: 167 },
  ];

  return (
    <div className='text-center '>
    <table className='table'>
      <thead>
        <tr>
          <th>Network</th>
          <th>Data Volume</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.network}</td>
            <td>{item.dataVolume}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataVolumeTable;
