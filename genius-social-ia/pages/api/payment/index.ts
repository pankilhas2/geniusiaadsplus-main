import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from '../../../lib/mercadoPago';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { title, price, email } = req.body;
    const preference = {
      items: [
        {
          title: title || 'Produto Digital',
          unit_price: Number(price),
          quantity: 1,
        },
      ],
      payer: { email },
      back_urls: {
        success: process.env.NEXT_PUBLIC_URL + '/sucesso',
        failure: process.env.NEXT_PUBLIC_URL + '/erro',
        pending: process.env.NEXT_PUBLIC_URL + '/pendente',
      },
      auto_return: 'approved',
      notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL,
    };
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
} 