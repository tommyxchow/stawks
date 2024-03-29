import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getStockPriceChange } from '../lib/helper';
import { StockChartData, StockQuote } from '../types/iex';

ChartJS.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
});

ChartJS.defaults.font.family = 'Inter';
ChartJS.defaults.font.weight = '600';

type StockChartProps = {
  stockChartData: StockChartData[];
  stockQuote?: StockQuote;
};

export default function StockChart({
  stockChartData,
  stockQuote,
}: StockChartProps) {
  const labels = stockChartData.map((data) => data.label);

  const priceChange = stockQuote?.change ?? getStockPriceChange(stockChartData);

  const options: ChartOptions<'line'> = {
    animation: false,
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
      tooltip: {
        bodyFont: {
          weight: '400',
        },
        displayColors: false,
        padding: 8,
        bodySpacing: 4,
        callbacks: {
          label: (context) => {
            return `Price: $${context.parsed.y.toFixed(2).toString()}`;
          },
          afterBody(tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const volume = stockChartData[index].volume.toLocaleString();
            return `Volume: ${volume}`;
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkipPadding: 50,
          maxRotation: 0,
          align: 'start',
        },
      },
    },
  };

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: stockChartData.map((data) => data.close),
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
