import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const productionDetails = await prisma.production.findMany();
        res.status(200).json(productionDetails);
      } catch (error) {
        console.error('Error fetching production details:', error);
        res.status(500).json({ error: 'Failed to retrieve data.' });
      }
      break;

    case 'POST':
      try {
        const formData = req.body;
        
        // Handle formData and save to database
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Failed to process request.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

export default handler;
