"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProductionItem {
  supplierName: string;
  modelName: string;
  partName: string;
  partNo: string;
  createdAt: string;
}

const ProductionTable: React.FC = () => {
  const [production, setProduction] = useState<ProductionItem[]>([]);

  const fetchProduction = async () => {
    try {
      const response = await axios.get("/api/production");
      setProduction(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options).replace(",", " |");
  };

  return (
    <div className="w-screen py-5 flex justify-center flex-col items-center">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">PRODUCTION PART APPROVAL PROCESS</h1>
      </div>

      <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">#</th>
              <th scope="col" className="py-3 px-6">Supplier Name</th>
              <th scope="col" className="py-3 px-6">Model Name</th>
              <th scope="col" className="py-3 px-6">Part Name</th>
              <th scope="col" className="py-3 px-6">Part No.</th>
              <th scope="col" className="py-3 px-6">Created Time</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {production.map((items, index) => (
              <tr key={items.partNo}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {index + 1}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {items.supplierName}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="text-sm font-medium text-gray-900">
                    {items.modelName}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="text-sm font-medium text-gray-900">
                    {items.partName}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {items.partNo}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatDate(items.createdAt)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4 hover:underline"
                    href={`/production/${items.partNo}`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        href="/productiondetails"
      >
        All PPAP Details
      </Link>
    </div>
  );
};

export default ProductionTable;
