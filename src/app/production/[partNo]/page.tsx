"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProductionData {
  supplierName: string;
  modelName: string;
  partName: string;
  SCD?: string;
  APQP?: string;
  NHKsPD?: string;
  ECR?: string;
  DFMEA?: string;
  PFD?: string;
  PFMEA?: string;
  ControlPlan?: string;
  MSA?: string;
  InspectionStandard?: string;
  InspectDataResult?: string;
  MaterialPerFormanceTest?: string;
  CP_CPK?: string;
  Labdoc?: string;
  AAR?: string;
  MasterSample?: string;
  CheckingAids?: string;
  PSW?: string;
  RiskAnalysis?: string;
}

const Partnodetails = ({ params }: { params: { partNo: string } }) => {
  const [supplierName, setSupplierName] = useState('');
  const [modelName, setModelName] = useState<string>('');
  const [partName, setPartName] = useState<string>('');
  const [SCD, setSCD] = useState<string>('');
  const [APQP, setAPQP] = useState<string>('');
  const [NHKsPD, setNHKsPD] = useState<string>('');
  const [ECR, setECR] = useState<string>('');
  const [DFMEA, setDFMEA] = useState<string>('');
  const [PFD, setPFD] = useState<string>('');
  const [PFMEA, setPFMEA] = useState<string>('');
  const [ControlPlan, setControlPlan] = useState<string>('');
  const [MSA, setMSA] = useState<string>('');
  const [InspectionStandard, setInspectionStandard] = useState<string>('');
  const [InspectDataResult, setInspectDataResult] = useState<string>('');
  const [MaterialPerFormanceTest, setMaterialPerFormanceTest] = useState<string>('');
  const [CP_CPK, setCP_CPK] = useState<string>('');
  const [Labdoc, setLabdoc] = useState<string>('');
  const [AAR, setAAR] = useState<string>('');
  const [MasterSample, setMasterSample] = useState<string>('');
  const [CheckingAids, setCheckingAids] = useState<string>('');
  const [PSW, setPSW] = useState<string>('');
  const [RiskAnalysis, setRiskAnalysis] = useState<string>('');

  useEffect(() => {
    const fetchPartNo = async () => {
      try {
        const res = await axios.get(`/api/production/${params.partNo}`);
        const data = res.data as ProductionData; 
        setSupplierName(data.supplierName);
        setModelName(data.modelName);
        setPartName(data.partName);
        setSCD(data.SCD || '');
        setAPQP(data.APQP || '');
        setNHKsPD(data.NHKsPD || '');
        setECR(data.ECR || '');
        setDFMEA(data.DFMEA || '');
        setPFD(data.PFD || '');
        setPFMEA(data.PFMEA || '');
        setControlPlan(data.ControlPlan || '');
        setMSA(data.MSA || '');
        setInspectionStandard(data.InspectionStandard || '');
        setInspectDataResult(data.InspectDataResult || '');
        setMaterialPerFormanceTest(data.MaterialPerFormanceTest || '');
        setCP_CPK(data.CP_CPK || '');
        setLabdoc(data.Labdoc || '');
        setAAR(data.AAR || '');
        setMasterSample(data.MasterSample || '');
        setCheckingAids(data.CheckingAids || '');
        setPSW(data.PSW || '');
        setRiskAnalysis(data.RiskAnalysis || '');
      } catch (error) {
        console.error('Error fetching production:', error);
      }
    };

    if (params.partNo) {
      fetchPartNo();
    }
  }, [params.partNo]); 

  return (
    <div className="w-screen py-5 flex justify-center flex-col items-center">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">PART NO. {params.partNo}</h1>
      </div>    
      <div className="mb-4 w-full max-w-lg bg-base-200 p-6 rounded-md shadow-md ">
      <label>Supplier name : </label>
        <div className="block text-lg font-semibold bg-base-100 rounded-md mb-2 p-1">{supplierName}    
        </div>

        <label> Model name :  </label>
        <div className="block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{modelName}    
        </div>

        <label>Part Name : </label>
        <div className="block text-lg font-medium bg-base-100 rounded-md p-1">{partName}    
        </div>
      </div>

      <div className="mb-4 w-full max-w-lg bg-base-200 p-6 rounded-md shadow-md ">
        {SCD && (
          <>
            <label> Supplier contact directory : </label>
            <a href={SCD} className="link link-primary block text-wrap md:text-balance font-light bg-base-100 rounded-md mb-2 p-1"> view file</a>
          </>
        )}

        {APQP && (
          <>
            <label> (APQP) : </label>
            <a href={APQP} className="link link-primary block text-wrap md:text-balance font-light bg-base-100 rounded-md mb-2 p-1">view file</a>
          </>
        )}

        {NHKsPD && (
          <>
            <label> NHK&apos;s Parts Drawing : </label>
            <a href={NHKsPD} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{NHKsPD}</a>
          </>
        )}

        {ECR && (
          <>
            <label> Engineering Change/Process Change Request : </label>
            <a href={ECR} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{ECR}</a>
          </>
        )}

        {DFMEA && (
          <>
            <label> (DFMEA) : </label>
            <a href={DFMEA} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{DFMEA}</a>
          </>
        )}

        {PFD && (
          <>
            <label> Process Flow Diagram : </label>
            <a href={PFD} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{PFD}</a>
          </>
        )}

        {PFMEA && (
          <>
            <label> (PFMEA) : </label>
            <a href={PFMEA} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{PFMEA}</a>
          </>
        )}

        {ControlPlan && (
          <>
            <label> Control plan : </label>
            <a href={ControlPlan} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{ControlPlan}</a>
          </>
        )}

        {MSA && (
          <>
            <label> (MSA) : </label>
            <a href={MSA} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{MSA}</a>
          </>
        )}

        {InspectionStandard && (
          <>
            <label> Inspection Standard : </label>
            <a href={InspectionStandard} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{InspectionStandard}</a>
          </>
        )}

        {InspectDataResult && (
          <>
            <label> Inspection Data Result : </label>
            <a href={InspectDataResult} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{InspectDataResult}</a>
          </>
        )}

        {MaterialPerFormanceTest && (
          <>
            <label> Material performance test : </label>
            <a href={MaterialPerFormanceTest} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{MaterialPerFormanceTest}</a>
          </>
        )}

        {CP_CPK && (
          <>
            <label> CP_CPK : </label>
            <a href={CP_CPK} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{CP_CPK}</a>
          </>
        )}

        {Labdoc && (
          <>
            <label> Qualified laboratory document : </label>
            <a href={Labdoc} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{Labdoc}</a>
          </>
        )}

        {AAR && (
          <>
            <label> (AAR) : </label>
            <a href={AAR} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{AAR}</a>
          </>
        )}

        {MasterSample && (
          <>
            <label> Master sample : </label>
            <a href={MasterSample} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{MasterSample}</a>
          </>
        )}

        {CheckingAids && (
          <>
            <label> Checking Aids : </label>
            <a href={CheckingAids} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{CheckingAids}</a>
          </>
        )}

        {PSW && (
          <>
            <label> (PSW) : </label>
            <a href={PSW} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{PSW}</a>
          </>
        )}

        {RiskAnalysis && (
          <>
            <label> 4M+1E Risk Analysis : </label>
            <a href={RiskAnalysis} className="link link-primary block text-lg font-medium bg-base-100 rounded-md mb-2 p-1">{RiskAnalysis}</a>
          </>
        )}
      </div>
      <Link
        className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        href="/production"
      >
        Back to production page
      </Link>
    </div>
  );
};

export default Partnodetails;
