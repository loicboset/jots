import React from 'react';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

import Spinner from '@/components/ui/loaders/Spinner';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useUserSkills } from '@/services/user_skills';
import { XP_PER_LEVEL } from '@/utils/constants';

function getSkillProgress(score: number): { level: number; progress: number; nextLevelScore: number } {
  const rawLevel = Math.floor(score / XP_PER_LEVEL);
  const level = Math.max(1, rawLevel + 1); // Shift levels to start at 1
  const currentLevelScore = (level - 1) * XP_PER_LEVEL;
  const nextLevelScore = level * XP_PER_LEVEL;
  const progress = (score - currentLevelScore) / XP_PER_LEVEL;

  return { level, progress, nextLevelScore };
}

const SkillsCharts = (): React.ReactElement => {
  // RQ
  const { data: skills = [], isLoading } = useUserSkills();

  // VARS
  const chartData = skills.map(({ skill, score }) => ({
    subject: skill,
    A: score,
  }));

  if (isLoading) {
    return (
      <div className='w-full flex items-start justify-center h-40'>
        <Spinner />
      </div>
    )
  }

  if (skills.length === 0) {
    return (
      <div className='w-full flex flex-col space-y-4 m-4 text-center border-b border-gray-500 pb-4'>
        <p className='text-md text-white'>Skills Data</p>
        <p className="text-sm/6 text-gray-400">No skills data available.</p>
        <p className="text-sm/6 text-gray-400">
          You can gain skills points by filling in some prompts accessible via the /prompts command in the editor.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className='text-md text-white text-center mb-4'>Skills Data</p>

      {chartData.length >= 3 ? (
        <div className='w-full flex flex-col items-center' style={{ height: '400px' }}>
          <div className='mb-4 flex justify-center'>
            <p className="text-sm/6 text-gray-400">
              Skill Radar Chart
            </p>
            <InfoTooltip message='You gain XP by answering prompts. More entries grow your skills over time.' />
          </div>
          <ResponsiveContainer width="80%" height="80%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar name="Mike" dataKey="A" stroke="#4f39f6" fill="#4f39f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="px-4 py-2 text-sm mb-4 text-center text-gray-400">
          Not enough skills data. Gain more XP by completing prompts to unlock the skills radar chart.
        </div>
      )}

      <div className="max-w-md mx-auto">
        {skills.map(({ skill, score }) => {
          const { level, progress, nextLevelScore } = getSkillProgress(score);
          return (
            <div key={skill} className="mb-4 p-4 bg-gray-800 rounded-xl shadow-md">
              <div className="flex justify-between text-sm text-gray-200 mb-1">
                <span className="capitalize">{skill} — Lv {level}</span>
                <span>{score}/{nextLevelScore} XP</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded">
                <div
                  className="bg-indigo-600 h-2 rounded transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SkillsCharts;
