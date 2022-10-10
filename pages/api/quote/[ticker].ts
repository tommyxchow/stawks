import type { NextApiRequest, NextApiResponse } from 'next';
import ErrorMessage from '../../../types/api-error';
import { StockQuote } from '../../../types/iex';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StockQuote | ErrorMessage>
) {
  const { ticker } = req.query;

  try {
    const stockQuote: StockQuote = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    res.status(200).json(stockQuote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data :(' });
  }
}
