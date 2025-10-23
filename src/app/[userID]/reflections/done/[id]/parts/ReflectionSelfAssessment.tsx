'use client';

import BarTabs from '@/components/ui/navigation/BarTabs';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import QuickSelfAssessment from './QuickSelfAssessment';
import AdvancedSelfAssessment from './AdvancedSelfAssessment';
import AutomaticAssessment from './AutomaticAssessment';

const ReflectionSelfAssessment = (): React.ReactElement => {
  // STATE
  const [activeTab, setActiveTab] = useState<string>('Quick');

  // METHODS
  const handleActiveTab = (tabName: string): void => setActiveTab(tabName);

  const tabs = [
    { name: 'Quick' },
    { name: 'Advanced' },
    { name: 'Automatic', icon: <SparklesIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="border p-4 mb-6 rounded-md">
      <p className="font-medium text-lg mb-4">Reflection Depth Score</p>
      <BarTabs activeTab={activeTab} tabs={tabs} handleActiveTab={handleActiveTab} />
      <div className="mt-6">
        {activeTab === 'Quick' && <QuickSelfAssessment />}
        {activeTab === 'Advanced' && <AdvancedSelfAssessment />}
        {activeTab === 'Automatic' && <AutomaticAssessment />}
      </div>
    </div>
  );
};

export default ReflectionSelfAssessment;
