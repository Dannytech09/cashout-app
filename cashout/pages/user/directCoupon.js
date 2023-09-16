import React from 'react'
import DirectCoupon from "../../components/user/DirectCoupon";
import withAuth from '@/hocs/withAuth';


const DirectCouponPage = () => {
  return (
    <div>
   <DirectCoupon/>
    </div>
  )
}


export default withAuth(DirectCouponPage);