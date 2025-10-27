import { JSX } from 'react';

import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import { useAchievements } from '../../../context/AchievementsProvider';

const ConfettiAnimation = (): JSX.Element | null => {
  const { width, height } = useWindowSize();
  const { confetti } = useAchievements();

  return confetti ? <Confetti width={width} height={height} /> : null;
};

export default ConfettiAnimation;
