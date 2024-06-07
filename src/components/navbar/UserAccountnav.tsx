"use client"

import { signOut } from "next-auth/react";

const SignoutPage = () => {
  return (
    <button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/signin`
        })} className="btn btn-error  text-white " >
     
        Sign Out
    </button>
  );
};

export default SignoutPage;