"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required").max(30),
  email: z.string().min(1, "Email is required").max(35),
  password: z.string().min(6, "Password must have more than 6 characters").max(30),
});

const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    });

    if (response.ok) {
      router.push("/signin");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl">
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm dark:text-gray-600">Sign up your account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              {...register("username")}
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>

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
            Sign Up
          </button>

          <p className='text-center text-sm text-gray-600 mt-2'>
            If you have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/signin'>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
