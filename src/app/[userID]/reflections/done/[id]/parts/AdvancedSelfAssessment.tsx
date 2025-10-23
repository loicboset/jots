import { useParams } from 'next/navigation';
import ScoreInput from './ScoreInput';
import { Controller, useForm } from 'react-hook-form';
import {
  useCreateUserReflectionAssessment,
  useUserReflectionAssessment,
} from '@/services/user_reflection_assessments';
import Button from '@/components/ui/buttons/Button';
import useToast from '@/utils/hooks/useToast';
import useStatusLogging from '@/utils/hooks/useStatusLogging';
import calculateReflectionScore from '../utils/calculateReflectionScore';
import { useEffect } from 'react';

export type TraitDetail = {
  trait: string;
  score: number;
};

type FormValues = {
  score: number;
  details: TraitDetail[];
};

const AdvancedSelfAssessment = (): React.ReactElement => {
  // ROUTER
  const params = useParams<{ id: string }>();

  // RQ
  const { data: reflectionAssessment, isLoading } = useUserReflectionAssessment(Number(params.id));
  const { mutate: createAssessment, data, status, error } = useCreateUserReflectionAssessment();

  // RHF
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      details: [
        { trait: 'description', score: 0 },
        { trait: 'emotion', score: 0 },
        { trait: 'connection', score: 0 },
        { trait: 'analysis', score: 0 },
        { trait: 'integration', score: 0 },
        { trait: 'transformation', score: 0 },
      ],
    },
  });

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  useStatusLogging({ status, data, error, setterFn: setToast });

  // EFFECTS
  useEffect(() => {
    if (reflectionAssessment) {
      reflectionAssessment.user_reflection_assessment_details.forEach((detail, index) => {
        setValue(`details.${index}.score`, detail.score);
      });
    }
  }, [reflectionAssessment, setValue]);

  // METHODS
  const handleCreateAssessment = (data: FormValues): void => {
    clearToast();

    createAssessment({
      reflectionID: Number(params.id),
      score: calculateReflectionScore(data.details),
      details: data.details,
    });
  };

  // VARS
  const assessmentTraits = [
    { name: 'Description', description: 'Facts, recounting events' },
    { name: 'Emotion', description: 'Acknowledged feelings' },
    { name: 'Connection', description: 'Links to past or external knowledge' },
    { name: 'Analysis', description: 'Explains causes, patterns, reasoning' },
    { name: 'Integration', description: 'Synthesizes new understanding' },
    { name: 'Transformation', description: 'Plans new action or mindset' },
  ];

  const noSavedAssessment = !reflectionAssessment && !isLoading;

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleCreateAssessment)}>
      {toast}

      {assessmentTraits.map((trait, index) => (
        <div
          key={trait.name}
          className="flex sm:items-center flex-col sm:flex-row sm:justify-between"
        >
          <div>
            <p className="font-semibold">{trait.name}</p>
            <p className="text-sm text-gray-500">{trait.description}</p>
          </div>

          <Controller
            key={trait.name}
            name={`details.${index}.score`}
            control={control}
            render={({ field: { value, onChange } }): React.ReactElement => (
              <ScoreInput value={value} onChange={onChange} />
            )}
          />
        </div>
      ))}
      {noSavedAssessment && (
        <div className="mt-4">
          <Button type="submit" isLoading={status === 'pending'} disabled={!!reflectionAssessment}>
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};

export default AdvancedSelfAssessment;
