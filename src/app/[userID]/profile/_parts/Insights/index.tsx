import MoodChart from './_parts/MoodChart';
import SkillsCharts from './_parts/SkillsCharts';

const Insights = (): React.ReactElement => (
  <div className="border-b border-gray-900/10 pb-12 flex">
    <div className=" w-1/6">
      <h2 className="text-base/7 font-semibold text-white">Insights</h2>
      <p className="mt-1 text-sm/6 text-gray-400">Gain insights in your journaling patterns.</p>
    </div>

    <div className="flex-1">
      <div>
        <SkillsCharts />
        <MoodChart />
      </div>
    </div>
  </div>
);

export default Insights;
