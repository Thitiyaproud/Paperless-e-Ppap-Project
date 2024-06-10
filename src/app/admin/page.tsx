import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserData from "@/components/admin/Admin";
import Image from 'next/image';

const AdminPage = async () => {
  const session = await getServerSession (authOptions)
  
  if (session?.user.role === "ADMIN"){
    return (
      <div className="flex-col flex justify-center">
        <div className="max-w-6xl mx-auto px-4 py-8">  
      <h1 
      className="text-4xl font-bold">
        Welcome back {session?.user.username}</h1>
      </div >
        <UserData/>
      </div>
    )
  }
  
  return (
          <div className="hero">
            <div className="hero-content flex flex-col items-center justify-center relative">
              <div className="relative">
                <Image src="warning.svg" alt="warning image of admin page" width={600}  height={600} className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                <p className="absolute bottom-0 right-0 text-sm font-light mr-2 mb-2">
                  Designed by <a rel="noopener noreferrer" href="https://www.freepik.com" className="text-blue-500 underline">Freepik.com</a>
                </p>
              </div>
              <div className="text-center">
                <h1 className="text-5xl font-bold">Checking Usage Rights</h1>
                <p className="py-6">You are not authorized to view admin page.</p>
              </div>
            </div>
          </div>



  )
};

export default AdminPage;