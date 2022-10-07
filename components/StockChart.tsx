import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PreviousDayPrice, StockData } from '../types/iex';

ChartJS.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
});

type StockChartProps = {
  stockData: StockData[];
  previousDayPrice: PreviousDayPrice;
};

export default function StockChart({
  stockData,
  previousDayPrice,
}: StockChartProps) {
  const currentPrice = stockData
    .slice()
    .reverse()
    .find((data) => data.close)?.close;

  const priceChange =
    (currentPrice ?? previousDayPrice.close) - previousDayPrice.close;

  const labels = stockData.map((data) => data.label);

  const options: ChartOptions<'line'> = {
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Price ($)',
        data: stockData.map((data) => data.close),
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          );

          gradient.addColorStop(
            0,
            priceChange >= 0 ? 'rgb(0,255,0,0.5)' : 'rgb(255,0,0,0.5)'
          );
          gradient.addColorStop(1, 'transparent');

          return gradient;
        },
        borderColor: priceChange >= 0 ? 'green' : 'red',
        spanGaps: true,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
