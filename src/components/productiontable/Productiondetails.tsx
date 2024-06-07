"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function productiondetails() {
  const [Production, setProduction] = useState([])

  const fetchProduction = async () => {
    try {
      const response = await axios.get('/api/production')
      setProduction(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteProduction = async (partNo: string) => {
    try {
      await axios.delete(`/api/production?partNo=${partNo}`)
      fetchProduction()
    } catch (error) {
      console.error('Failed to delete the part No.', error)
    }
  }

  useEffect(() => {
    fetchProduction()
  }, [])

  return (
    <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 ">
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center ">
        <h1 className="text-4xl font-bold ">PRODUCTION PART APPROVAL PROCESS</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs text-xs ">
          <thead className="rounded-t-lg dark:bg-gray-300">
            <tr className="text-right ">
              <th scope="col" className="py-3 px-6">#</th>
              <th scope="col" className="py-3 px-6 text-center">Actions</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Supplier Name</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Model Name</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Part Name</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Part No.</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Supplier Contact Directory</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Advance Products Quality Planning (APQP)</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">NHK's Parts Drawing</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Engineering Change/Process Change Request</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Design Failure Mode and Effects Analysis (DFMEA)</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Process Flow Diagram</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Process Failure Mode and Effects Analysis (PFMEA)</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Control Plan</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Measurement System Analysis (MSA)</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Inspection Standard</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Inspection Data Result</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Material Performance Test</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">List of Special Parts Characteristics</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Qualified Laboratory Document</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Appearance Approval Report (AAR) and Limited Sample Parts</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Master Sample</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Checking Aids</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Parts Submission Warrant (PSW) [Interim/Full Approval]</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">4M+1E Risk Analysis</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {Production.map((items: any, index: number) => (
              <tr key={items.partNo}>
                <td className="px-6 py-4  ">
                  <div className="text-xs font-medium">
                    {index + 1}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4 hover:underline"
                    href={`/production/${items.partNo}`}
                  >
                    Details
                  </Link>
                  <button onClick={() => deleteProduction(items.partNo)} className="text-red-600 hover:text-red-900 ml-2 hover:underline">
                    Delete
                  </button>
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
                  {items.SCD && (
                    <a href={items.SCD} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.APQP && (
                    <a href={items.APQP} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.NHKsPD && (
                    <a href={items.NHKsPD} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.ECR && (
                    <a href={items.ECR} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.DFMEA && (
                    <a href={items.DFMEA} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.PFD && (
                    <a href={items.PFD} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.PFMEA && (
                    <a href={items.PFMEA} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.ControlPlan && (
                    <a href={items.ControlPlan} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.MSA && (
                    <a href={items.MSA} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.InspectionStandard && (
                    <a href={items.InspectionStandard} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.InspectDataResult && (
                    <a href={items.InspectDataResult} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.MaterialPerFormanceTest && (
                    <a href={items.MaterialPerFormanceTest} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.CP_CPK && (
                    <a href={items.CP_CPK} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.Labdoc && (
                    <a href={items.Labdoc} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.AAR && (
                    <a href={items.AAR} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.MasterSample && (
                    <a href={items.MasterSample} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.CheckingAids && (
                    <a href={items.CheckingAids} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.PSW && (
                    <a href={items.PSW} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {items.RiskAnalysis && (
                    <a href={items.RiskAnalysis} target="_blank" className="text-blue-600 hover:underline">
                      View file
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
