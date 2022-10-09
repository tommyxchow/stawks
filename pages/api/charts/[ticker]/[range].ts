// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { StockChartData } from '../../../../types/iex';

type ErrorMessage = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StockChartData | ErrorMessage>
) {
  const { ticker, range } = req.query;

  try {
    const stockChartData: StockChartData = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    res.status(200).json(stockChartData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data :(' });
  }
}
