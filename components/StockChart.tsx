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
import { StockData } from '../types/iex';

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
};

export default function StockChart({ stockData }: StockChartProps) {
  const labels = stockData.map((data) => data.label);

  const options: ChartOptions = {
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
        data: stockData.map((data) => data.average),
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'white');
          gradient.addColorStop(1, 'black');
          return gradient;
        },
        borderColor: 'rgb(255,255,255,0.5)',
        spanGaps: true,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
