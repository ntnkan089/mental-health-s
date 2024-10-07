import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';
interface MoodEntry {

  date: Date;
  mood: number;

}

interface MoodHistoryChartProps {
  moodHistory: MoodEntry[];
}

const MoodHistoryChart: React.FC<MoodHistoryChartProps> = ({ moodHistory }) => {
  useEffect(() => {
    const ctx = (document.getElementById('moodChart') as HTMLCanvasElement)?.getContext('2d');
    
    if (!ctx) return; // Make sure the context exists before creating the chart

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: moodHistory.map(entry => entry.date.toLocaleDateString()),
        datasets: [
          {
            label: 'Mood over Time',
            data: moodHistory.map(entry => entry.mood),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [moodHistory]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
      <canvas id="moodChart"></canvas>
    </div>
  );
};

export default MoodHistoryChart;

