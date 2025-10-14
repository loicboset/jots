import { TRAITWEIGHTMAP } from '@/utils/constants';
import { TraitDetail } from '../parts/ReflectionAssessment';

const calculateReflectionScore = (details: TraitDetail[]): number => {
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const { trait, score } of details) {
    const weight = TRAITWEIGHTMAP[trait.toLowerCase()] ?? 1;
    totalWeightedScore += score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  const normalizedScore = totalWeightedScore / totalWeight;

  return Math.round(normalizedScore * 10) / 10; // round to 1 decimal
};

export default calculateReflectionScore;
