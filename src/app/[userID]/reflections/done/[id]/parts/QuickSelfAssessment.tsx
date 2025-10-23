'use client';

import Button from '@/components/ui/buttons/Button';
import {
  useCreateUserReflectionAssessment,
  useUserReflectionAssessment,
} from '@/services/user_reflection_assessments';
import useStatusLogging from '@/utils/hooks/useStatusLogging';
import useToast from '@/utils/hooks/useToast';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ScoreInput from './ScoreInput';

const QuickSelfAssessment = (): React.ReactElement => {
  // ROUTER
  const params = useParams<{ id: string }>();

  // STATE
  const [selectedScore, setSelectedScore] = useState<number>();

  // RQ
  const { data: reflectionAssessment, isLoading } = useUserReflectionAssessment(Number(params.id));
  const { mutate: createAssessment, data, status, error } = useCreateUserReflectionAssessment();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  useStatusLogging({ status, data, error, setterFn: setToast });

  // METHODS
  const onScoreChange = (score: number): void => setSelectedScore(score);

  const handleCreateAssessment = (): void => {
    clearToast();
    if (selectedScore === undefined) return;

    createAssessment({
      reflectionID: Number(params.id),
      score: selectedScore,
    });
  };

  // VARS
  const noSavedAssessment = !reflectionAssessment && !isLoading;

  return (
    <div>
      {toast}

      <p className="tfont-semibold text-gray-100">Choose a score</p>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <ScoreInput
          value={selectedScore || reflectionAssessment?.score}
          onChange={onScoreChange}
          disabled={!!reflectionAssessment}
        />

        {noSavedAssessment && (
          <Button
            onClick={handleCreateAssessment}
            isLoading={status === 'pending'}
            disabled={!!reflectionAssessment}
          >
            Submit
          </Button>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-300">
        Your score reflects how deeply you explored your experience — from simply{' '}
        <span className="font-semibold text-gray-100">describing what happened</span> (0–1), to{' '}
        <span className="font-semibold text-gray-100">analyzing patterns</span> and drawing insights
        (2–4), up to{' '}
        <span className="font-semibold text-gray-100">transforming your understanding</span> into
        new actions or mindsets (5).
      </p>
    </div>
  );
};

export default QuickSelfAssessment;
