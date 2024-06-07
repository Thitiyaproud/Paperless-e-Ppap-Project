"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const FormSchema = z.object({
  email: z.string().min(3, "Email is required").max(35).email("Invalid email address"),
  password: z.string().min(6, "Password must have more than 6 characters").max(30),
});

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast.error("Sign In Error");
      console.log(signInData.error)
    } else {
      router.push("/supplier");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl">
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign In</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded" 
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full btn btn-success text-white py-2 rounded mb-4"
          >
            Sign In
          </button>
          
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you don&apos;t have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/signup'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
