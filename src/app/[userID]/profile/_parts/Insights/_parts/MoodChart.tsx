import { JSX } from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import Spinner from "@/components/ui/loaders/Spinner";
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useUserContext } from '@/context/UserProvider';
import { useMoodChecks } from '@/services/mood_checks';


const formatToShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', // Mon, Tue, etc.
    month: 'short',   // Jan, Feb, etc.
    day: '2-digit',   // 01, 02, etc.
    timeZone: 'UTC',
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

const MoodChart = (): JSX.Element => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data = [], isLoading } = useMoodChecks(user?.userID, 7);

  if (isLoading) {
    return (
      <div className='w-full flex items-start justify-center h-40'>
        <Spinner />
      </div>
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
      <div className='w-full flex flex-col space-y-4 m-4 text-center border-b border-gray-500 pb-4'>
        <p className='text-md text-white'>Mood Data</p>
        <p className="text-sm/6 text-gray-400 text-center">Not enought mood entries found.</p>
        <p className="text-sm/6 text-gray-400 text-center">
          You need at least 7 mood logs to see the insights chart. Log your mood to be able to track your evolution.</p>
      </div>
    );
  }

  return (
    <>
      <p className='text-md text-white text-center mb-4'>Mood Data</p>

      <div className='w-full flex flex-col items-center' style={{ height: '400px' }}>
        <div className='mb-4 flex justify-center' >
          <p className="text-sm/6 text-gray-400">
            Mood Chart
          </p>
          <InfoTooltip message='Your mood score for your last 7 entries.' />
        </div>
        <ResponsiveContainer width="80%" height="80%">
          <LineChart data={chartData} margin={{ left: 15, right: 15, bottom: 60 }}>
            <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} />
            <YAxis domain={[1, 5]} />
            <CartesianGrid stroke="#ccc" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="score" stroke="#4f39f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default MoodChart;