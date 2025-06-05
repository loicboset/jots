import { JSX } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import InfoTooltip from '../../tooltips/InfoTooltip';
import Spinner from "@/components/ui/loaders/Spinner";
import { MoodCheck } from '@/types/api/mood_checks';

type MoodChartProps = {
  data: MoodCheck[] | undefined;
};

const formatToShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', // Mon, Tue, etc.
    month: 'short',   // Jan, Feb, etc.
    day: '2-digit',   // 01, 02, etc.
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ active, payload, label }: any): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontSize: '14px',
          color: '#333',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{label}</div>
        <div>Mood score: <strong>{payload[0].value}</strong></div>
      </div>
    );
  }

  return null;
};

const MoodChart = ({data}: MoodChartProps): JSX.Element => {
  if (!data) {
    return (
      <Spinner size="small" />
    )
  }

  const chartData = data
    .slice() // clone the array to avoid mutating the original
    .sort((b, a) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(entry => ({
      ...entry,
      date: formatToShortDate(entry.created_at),
    }));

  if (chartData.length < 7) {
    return (
      <div className="border border-red-300 bg-red-200 text-red-800 rounded-xl px-4 py-2 text-sm/6 font-medium shadow-sm">
        Not enough insights. Log more mood to unlock your mood chart.
      </div>
    )
  }
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <div className='mb-4 flex justify-center' >
        <p className="text-sm/6 text-gray-400">
          Mood Chart
        </p>
        <InfoTooltip message='Your mood score for your last 7 entries.' />
      </div>
      <ResponsiveContainer width="80%" height="80%">
        <LineChart data={chartData} margin={{ left: 15, right: 15, bottom: 60 }}>
          <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0}/>
          <YAxis domain={[1, 5]} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;