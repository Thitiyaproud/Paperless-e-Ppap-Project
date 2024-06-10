import SupplierForm from "@/components/supplierform/SupplierForm"
import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from 'next/image';

const SupplierPage = async() => {
  const session = await getServerSession (authOptions)
  
  if (session?.user){
  return (
    <div className='w-full'>
      <SupplierForm />
    </div>
  );
}

return (
  <div className="hero">
  <div className="hero-content flex-col justify-center">
    <Image src="warning2.jpg" alt="warning image of supplier page" width={500}  height={500} className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
    <div>
      <h1 className="text-5xl font-bold">Please Log in first</h1>
      <p className="py-6">You are not authorized to view page.</p>
    </div>
  </div>
</div>

)

};

export default SupplierPage;