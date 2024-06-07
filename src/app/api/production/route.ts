import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import mime from 'mime';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();

const s3 = new S3Client({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function GET() {
  return NextResponse.json(await prisma.production.findMany());
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const partNo = formData.get("partNo") as string;
    const supplierName = formData.get("supplierName") as string;
    const modelName = formData.get("modelName") as string;
    const partName = formData.get("partName") as string;

    const fields = [
      "SCD", "APQP", "NHKsPD", "ECR", "DFMEA", "PFD", "PFMEA",
      "ControlPlan", "MSA", "InspectionStandard", "InspectDataResult",
      "MaterialPerFormanceTest", "CP_CPK", "Labdoc", "AAR",
      "MasterSample", "CheckingAids", "PSW", "RiskAnalysis"
    ];

    const fileUrls: { [key: string]: string | null } = {};

    for (const field of fields) {
      const file = formData.get(field) as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${field}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
        const key = `${uniqueSuffix}/${filename}`;

        const command = new PutObjectCommand({
          Bucket: 'paperless-supplier',
          Key: key,
          Body: buffer,
          ContentType: file.type,
        });

        await s3.send(command);

        const fileUrl = `https://paperless-supplier.s3.ap-southeast-1.amazonaws.com/${key}`; 
        fileUrls[field] = fileUrl;
      } else {
        fileUrls[field] = null;
      }
    }

    const result = await prisma.production.create({
      data: {
        partNo,
        supplierName,
        modelName,
        partName,
        ...fileUrls
      },
    });

    return NextResponse.json({ production: result });

  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Failed to process request." }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const partNo = searchParams.get('partNo');

    if (!partNo) {
      return NextResponse.json({ error: 'Invalid part number' }, { status: 400 });
    }

    const production = await prisma.production.findUnique({
      where: { partNo },
    });

    if (!production) {
      return NextResponse.json({ error: 'Part not found' }, { status: 404 });
    }

    const fields = [
      "SCD", "APQP", "NHKsPD", "ECR", "DFMEA", "PFD", "PFMEA",
      "ControlPlan", "MSA", "InspectionStandard", "InspectDataResult",
      "MaterialPerFormanceTest", "CP_CPK", "Labdoc", "AAR",
      "MasterSample", "CheckingAids", "PSW", "RiskAnalysis"
    ];

    for (const field of fields) {
      const fileUrl = production[field as keyof typeof production] as string | null;
      if (fileUrl) {
        const key = fileUrl.split('https://paperless-supplier.s3.ap-southeast-1.amazonaws.com/')[1];

        const command = new DeleteObjectCommand({
          Bucket: 'paperless-supplier',
          Key: key,
        });

        await s3.send(command);
      }
    }

    const deletedProduction = await prisma.production.delete({
      where: { partNo },
    });

    return NextResponse.json(deletedProduction, { status: 200 });
  } catch (error) {
    console.error('Error deleting production:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
