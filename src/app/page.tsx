import React from "react";
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
          <section className="dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
              <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl ">NHK 
                </h1>
                <h2 className="font-bold sm:text-6xl mb-5"> Production Part Approval Process </h2>
                <div className="mb-6">
                <p className=" text-lg ">NHK SPRING (THAILAND) CO.,LTD. </p>
                <p className=" text-lg sm:mb-2">Department Quality Assurance (QA)</p>
                </div>
                <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                  <Link href="production" className="px-8 py-3 text-lg font-semibold border  rounded ">Production</Link>
                  <Link href="/supplier" className="px-8 py-3 text-lg font-semibold border rounded bg-green-400">Supplier</Link>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <div className="relative">
                <Image src="/1.jpg" alt="Image of home page" width={500}  height={500} className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />      
                <p className="absolute bottom-0 right-0 text-sm font-light mr-2 mb-2">
                  Designed by <a rel="noopener noreferrer" href="https://www.freepik.com" className="text-blue-500 underline">Freepik.com</a>
                </p>
              </div>     
              </div>
            </div>
          </section>
  );
}
