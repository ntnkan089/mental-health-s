import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

interface MoodHistory {
  id: number;
  userId: string;
  entryType: string;
  value: string;
  note: string;
  entryDate: Date;
}

interface TrackingHistoryChartProps {
  moodHistory: MoodHistory[];
}

// Define a union type for entry types
type EntryType = 'Mood' | 'Anxiety' | 'Exercise' | 'Sleep';

const TrackingHistoryChart: React.FC<TrackingHistoryChartProps> = ({ moodHistory }) => {
  // Group entries by type (mood, anxiety, exercise, sleep)
  const entriesByType = moodHistory.reduce((acc, entry) => {
    acc[entry.entryType] = acc[entry.entryType] || [];
    acc[entry.entryType].push(entry);
    return acc;
  }, {} as Record<string, MoodHistory[]>);

  const valueToNumber = (type: string, value: string | number): number => {
    if (typeof value === 'number') return value;

    switch (type) {
      case 'Mood':
        return {
          'Happy': 5,
          'Content': 4,
          'Sad': 2,
          'Anxious': 1,
          'Excited': 5,
          'Calm': 4,
          'Frustrated': 2,
        }[value] || 3;
      case 'Anxiety':
        return {
          'None': 0,
          'Mild': 1,
          'Moderate': 3,
          'Severe': 5,
        }[value]!;
      case 'Exercise':
        return {
          'None': 0,
          'Mild': 1,
          'Light': 2,
          'Good': 3,
          'Excellent': 5,
        }[value]!;
      case 'Sleep':
        return parseFloat(value.toString());
      default:
        return 0;
    }
  };

  useEffect(() => {
    const charts: Record<string, Chart> = {};

    // Define color mapping for each entry type
    const colorMapping: Record<EntryType, { background: string; border: string }> = {
      Mood: {
        background: 'rgba(75, 192, 192, 0.2)', // Light teal
        border: 'rgba(75, 192, 192, 1)', // Dark teal
      },
      Anxiety: {
        background: 'rgba(54, 162, 235, 0.2)', // Light blue
        border: 'rgba(54, 162, 235, 1)', // Dark blue
      },
      Exercise: {
        background: 'rgba(255, 99, 132, 0.2)', 
        border: 'rgba(255, 99, 132, 1)', 
      },
      Sleep: {
        background: 'rgba(153, 102, 255, 0.2)', // Light purple
        border: 'rgba(153, 102, 255, 1)', // Dark purple
      },
    };

    Object.keys(entriesByType).forEach(type => {
      const ctx = (document.getElementById(`trackingChart-${type}`) as HTMLCanvasElement)?.getContext('2d');
      if (!ctx) return; // Ensure context exists

      // Assert the type to EntryType for safe indexing
      const entryType = type as EntryType;

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: entriesByType[entryType].map(entry => entry.entryDate.toLocaleDateString()), // Correct usage
          datasets: [
            {
              label: `${entryType} over Time`,
              data: entriesByType[entryType].map(entry => valueToNumber(entryType, entry.value)),
              backgroundColor: colorMapping[entryType]?.background || 'rgba(75, 192, 192, 0.2)', // Default color if type is unknown
              borderColor: colorMapping[entryType]?.border || 'rgba(75, 192, 192, 1)', // Default color if type is unknown
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

      charts[entryType] = chart; // Store chart for cleanup
    });

    return () => {
      Object.values(charts).forEach(chart => chart.destroy()); // Cleanup on component unmount
    };
  }, [moodHistory]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
      {Object.keys(entriesByType).map(type => (
        <div key={type} className="mt-4">
          <h3 className="text-lg font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)} Chart</h3>
          <canvas id={`trackingChart-${type}`} style={{ width: '100%', height: '300px' }}></canvas>
        </div>
      ))}
    </div>
  );
};

export default TrackingHistoryChart;














