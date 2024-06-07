import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    try {
      const productionDetails = await prisma.production.findMany();
      res.status(200).json(productionDetails);
    } catch (error) {
      console.error('Error fetching production details:', error);
      res.status(500).json({ error: 'Failed to retrieve data.' });
    }
  } else if (req.method === 'POST') {
    try {
      const formData = req.body;

      // handle formData and save to database

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Failed to process request.' });
    }
  }
}
