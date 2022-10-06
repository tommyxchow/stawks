import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StockData } from '../types/iex';

Chart.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
});

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
        backgroundColor: 'white',
        borderColor: 'white',
        spanGaps: true,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

type StockChartProps = {
  stockData: StockData[];
};
