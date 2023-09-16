import React from 'react'
import withAuth from '@/hocs/withAuth';
import LockCouponComp from '@/components/admin/LockCoupon';


const LockDataCoupon = () => {
  return (
    <div>
   <LockCouponComp/>
    </div>
  )
}


export default withAuth(LockDataCoupon);