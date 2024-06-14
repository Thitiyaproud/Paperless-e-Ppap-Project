import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountnav from "./UserAccountnav"
import Image from 'next/image';

export const Navbar = async () => {

  const session = await getServerSession (authOptions)
    return(
        <nav className=" text-black p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between item-center">
                <a href="" className="text-2xl font-bold">
                    <Image src="/LOGONHK.jpg" alt="LOGONHK image" width={115}  height={60} />
                </a>

                <div className="hidden md:flex">
                <ul className="md:flex md:items-center">
                 <li className="mx4">
                    <a href="/" className="mx-2 btn btn-active btn-neutral ">
                    Home
                     </a>
                 </li >

                 <li className="mx4">
                 <a href="/supplier" className="mx-2 btn btn-active btn-neutral">
                    Supplier
                </a>
                </li >

                <li className="mx4">
                <a href="/production" className="mx-2 btn btn-outline">
                    Production
                </a>
                </li>

                <li className="mx4">
                <a href="/admin" className="mx-2 btn btn-outline ">
                    Admin
                </a>
                </li>

                </ul>
                {session?.user ? (
                    <UserAccountnav/>
                ) : (
                    <a className="btn btn-success  text-white" href="/signin">
                    Sign In
                    </a>
                )}

                </div>
            </div>
        </nav>
    );
};
