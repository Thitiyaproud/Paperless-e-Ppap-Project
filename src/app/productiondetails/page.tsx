import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ProductionDetails from "@/components/productiontable/Productiondetails";

async function ProductionPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === 'ADMIN') {
    return (
      <div>
        <ProductionDetails />
      </div>
    );
  }

  return (
          <div className="hero">
          <div className="hero-content flex flex-col items-center justify-center relative">
            <div className="relative">
              <img src="warning1.svg" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
              <p className="absolute bottom-0 right-0 text-sm font-light mr-2 mb-2">
                Designed by <a rel="noopener noreferrer" href="https://www.freepik.com" className="text-blue-500 underline">Freepik.com</a>
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold">Checking Usage Rights</h1>
              <p className="py-6">You are not authorized to view productiondetails page.</p>
            </div>
          </div>
        </div>
)
}

export default ProductionPage;
