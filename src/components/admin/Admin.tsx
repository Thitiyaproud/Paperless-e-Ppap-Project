"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";

interface AdminItem {
  email:        String;   
  username:     String;    
  password:     String;
  role:         String;
  createdAt:    String;
}

const AdminPage = () => {
  const [admin, setAdmin] = useState<AdminItem[]>([]);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get('/api/admin');
      setAdmin(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  const deleteAdmin = async (id: number) => { 
    try {
      await axios.delete(`/api/admin?id=${id}`);
      fetchAdmin();
    } catch (error) {
      console.error('Failed to delete the user.', error);
    }
  }

  useEffect(() => {
    fetchAdmin();
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
      <div className="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">#</th>
              <th scope="col" className="py-3 px-6">User name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Role</th>
              <th scope="col" className="py-3 px-6">Created time</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {admin.map((items: any, index: number) => (
              <tr key={items.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="text-sm font-medium text-gray-900">
                    {items.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="text-sm font-medium text-gray-900">
                    {items.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 flex justify-center">
                    {items.role}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                  {formatDate(items.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => deleteAdmin(items.id)} className="text-red-600 hover:text-red-900 ml-2 hover:underline">
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
