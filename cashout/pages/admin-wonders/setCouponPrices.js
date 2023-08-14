import React from 'react'
import withAuth from '@/hocs/withAuth';
import AnyNameForDefaultExport  from '@/components/admin/SetCouponPrices';


const SetPrices = () => {
  return (
    <div>
   <AnyNameForDefaultExport/>
    </div>
  )
}


export default withAuth(SetPrices);