"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from 'react-hot-toast';

const supplierSchema = z.object({
  partNo: z.string().min(10).max(10),
  supplierName: z.string().min(1).max(40),
  modelName: z.string().min(4).max(25),
  partName: z.string().min(2).max(35),
  SCD: z.any().optional(),
  APQP: z.any().optional(),
  NHKsPD: z.any().optional(),
  ECR: z.any().optional(),
  DFMEA: z.any().optional(),
  PFD: z.any().optional(),
  PFMEA: z.any().optional(),
  ControlPlan: z.any().optional(),
  MSA: z.any().optional(),
  InspectionStandard: z.any().optional(),
  InspectDataResult: z.any().optional(),
  MaterialPerFormanceTest: z.any().optional(),
  CP_CPK: z.any().optional(),
  Labdoc: z.any().optional(),
  AAR: z.any().optional(),
  MasterSample: z.any().optional(),
  CheckingAids: z.any().optional(),
  PSW: z.any().optional(),
  RiskAnalysis: z.any().optional(),
});

type SupplierFormInputs = z.infer<typeof supplierSchema>;

export default function SupplierForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupplierFormInputs>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit: SubmitHandler<SupplierFormInputs> = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        const fieldValue = data[key as keyof SupplierFormInputs];
        if (fieldValue instanceof FileList) {
          for (const file of Array.from(fieldValue)) {
            formData.append(key, file);
          }
        } else if (fieldValue instanceof File) {
          formData.append(key, fieldValue);
        } else {
          formData.append(key, fieldValue as string);
        }
      }

      const response = await axios.post("/api/production", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Form submitted successfully!");
      reset(); // Clear form data

      console.log("Success:", response.data);
    } catch (error) {
      toast.error("Error submitting form.");
      console.error("Error:", error);
    }
  };

  return (
          <section className="dark:bg-gray-100 dark:text-black">
          <div className="w-screen py-20 flex justify-center flex-col items-center">
            <div className="flex items-center justify-between gap-1 mb-5">
              <h1 className="text-4xl font-bold">PPAP REQUIREMENT ELEMENT</h1>
            </div>
        
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-base-100 p-6 rounded-md shadow-md">
              <div className="mb-4">
                <label className="block text-lg font-medium" htmlFor="supplier-name">
                  Supplier name
                </label>
                <input
                  type="text"
                  id="supplier-name"
                  {...register("supplierName")}
                  placeholder="Enter your name"
                  className="input input-bordered mt-2 w-full"
                />
                {errors.supplierName && <p className="text-red-500">{errors.supplierName.message?.toString()}</p>}
              </div>
        
              <div className="mb-4">
                <label className="block text-lg font-medium" htmlFor="model-name">
                  Model name
                </label>
                <input
                  type="text"
                  id="model-name"
                  {...register("modelName")}
                  placeholder="Enter your model name"
                  className="input input-bordered mt-2 w-full"
                />
                {errors.modelName && <p className="text-red-500">{errors.modelName.message?.toString()}</p>}
              </div>
        
              <div className="mb-4">
                <label className="block text-lg font-medium" htmlFor="part-name">
                  Part Name
                </label>
                <input
                  type="text"
                  id="part-name"
                  {...register("partName")}
                  placeholder="Enter your part name"
                  className="input input-bordered mt-2 w-full"
                />
                {errors.partName && <p className="text-red-500">{errors.partName.message?.toString()}</p>}
              </div>
        
              <div className="mb-4">
                <label className="block text-lg font-medium" htmlFor="part-no">
                  Part No.
                </label>
                <input
                  type="text"
                  id="part-no"
                  {...register("partNo")}
                  placeholder="Enter your part no."
                  className="input input-bordered mt-2 w-full"
                />
                {errors.partNo && <p className="text-red-500">{errors.partNo.message?.toString()}</p>}
              </div>
        
              {[
                { field: "SCD", label: "Supplier contact directory" },
                { field: "APQP", label: "(APQP)" },
                { field: "NHKsPD", label: "NHK's Parts Drawing" },
                { field: "ECR", label: "Engineering Change/Process Change Request" },
                { field: "DFMEA", label: "(DFMEA)" },
                { field: "PFD", label: "Process Flow Diagram" },
                { field: "PFMEA", label: "(PFMEA)" },
                { field: "ControlPlan", label: "Control Plan" },
                { field: "MSA", label: "(MSA)" },
                { field: "InspectionStandard", label: "Inspection Standard" },
                { field: "InspectDataResult", label: "Inspection Data Result" },
                { field: "MaterialPerFormanceTest", label: "Material Performance Test" },
                { field: "CP_CPK", label: "CP/CPK" },
                { field: "Labdoc", label: "Qualified laboratory document" },
                { field: "AAR", label: "(AAR)" },
                { field: "MasterSample", label: "Master Sample" },
                { field: "CheckingAids", label: "Checking Aids" },
                { field: "PSW", label: "(PSW)" },
                { field: "RiskAnalysis", label: "4M+1E Risk Analysis" }
                ].map(({ field, label }) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-lg font-medium" htmlFor={field}>
                      {label}
                    </label>
                    <input
                      type="file"
                      id={field}
                      {...register(field as keyof SupplierFormInputs)}
                      className="file-input file-input-bordered file-input-sm file-input-accent mt-2 w-full"
                    />
                    {errors[field as keyof SupplierFormInputs] && <p className="text-red-500">{errors[field as keyof SupplierFormInputs]?.message?.toString()}</p>}
                  </div>
                ))}
        
              <button className="btn btn-success mt-4 w-full text-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        </section>
        
        );
      }