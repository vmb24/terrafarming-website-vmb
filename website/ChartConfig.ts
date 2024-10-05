import { Chart, registerables } from 'chart.js';

export function setupChart() {
  Chart.register(...registerables);
}