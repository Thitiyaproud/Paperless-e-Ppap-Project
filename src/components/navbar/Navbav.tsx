import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountnav from "./UserAccountnav"
export const Navbar = async () => {
    
  const session = await getServerSession (authOptions)
    return(
        <nav className=" text-black p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between item-center">
                <a href="" className="text-2xl" font-bold>
                    <img src="/LOGONHK.jpg" width="115px" height="60px"/>
                </a>
                <div className="hidden md:flex">
                <Link href="/" className="mx-2 btn btn-active btn-neutral ">
                    Home
                </Link>
                <Link href="/supplier" className="mx-2 btn btn-active btn-neutral">
                    Supplier
                </Link>
                <Link href="/production" className="mx-2 btn btn-outline">
                    Production
                </Link>
                <Link href="/admin" className="mx-2 btn btn-outline ">
                    Admin
                </Link>

                {session?.user ? (
                    <UserAccountnav/>
                ) : (
                    <Link className="btn btn-success  text-white" href="/signin">
                    Sign In
                    </Link>
                )}

                </div>
            </div>
        </nav>
    );
};
