import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  // Apenas loga o evento recebido para debug
  console.log('Webhook Mercado Pago:', req.body);
  res.status(200).json({ received: true });
} 