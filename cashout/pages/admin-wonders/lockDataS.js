import withAuth from '@/hocs/withAuth'
import React from 'react';
import DataLocker from "@/components/admin/LockDataS";

function LockDataSS() {
  return (
    <div>
     <DataLocker />
    </div>
  )
}

export default withAuth(LockDataSS);
