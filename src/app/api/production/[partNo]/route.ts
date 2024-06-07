import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { partNo: string } },
) {
  return Response.json(await prisma.production.findUnique({
    where: {partNo :(params.partNo)},
  }))
}