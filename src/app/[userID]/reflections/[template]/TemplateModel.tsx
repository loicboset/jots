'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/buttons/Button';
import { useForm } from 'react-hook-form';
import { useCreateUserReflection } from '@/services/user_reflections';
import Input from '@/components/ui/inputs/Input';
import { useEffect } from 'react';
import { useCalendarContext } from '@/context/CalendarContextProvider';

type Props = {
  templateID: string;
};

const templates = [
  {
    id: 'process_event',
    questions: [
      'What exactly happened?',
      'What were you thinking and feeling?',
      'What went well and what didn’t?',
      'Why do you think it unfolded this way?',
      'What could you have done differently?',
      'What will you do next time in a similar situation?',
    ],
  },
  {
    id: 'learn_from_mistake_or_success',
    questions: [
      'What was the situation or challenge?',
      'What actions did you take?',
      'What was the outcome?',
      'What did you learn from this experience?',
      'How can you apply this learning to future situations?',
    ],
  },
  {
    id: 'think_through',
    questions: [
      'What’s the current situation or goal?',
      'What options or approaches are available?',
      'What assumptions or risks exist?',
      'What insights or data inform your choice?',
      'What’s your next step or experiment?',
    ],
  },
  {
    id: 'freestyle',
    questions: [
      'What stood out to you today?',
      'What lessons or insights did you gain?',
      'What do you want to remember or act on tomorrow?',
    ],
  },
  {
    id: 'understand_myself',
    questions: [
      'What experience or feeling do I want to explore?',
      'What emotions were present, and why?',
      'What do these feelings reveal about my values or needs?',
      'How does this shape the way I see myself?',
      'What meaning or insight emerges from this reflection?',
    ],
  },
  {
    id: 'learn_from_content',
    questions: [
      'What was the main idea or takeaway?',
      'What parts resonated or challenged me?',
      'How does this connect with what I already know or believe?',
      'What will I change or try based on this?',
      'How can I validate or deepen this understanding?',
    ],
  },
];

type FormValues = {
  name: string;
  [key: string]: string;
};

const TemplateModel = ({ templateID }: Props): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // RQ
  const { mutate: createUserReflection, status, data } = useCreateUserReflection();

  // ROUTER
  const router = useRouter();

  // RHF
  const { register, handleSubmit } = useForm<FormValues>();

  // EFFECTS
  useEffect(() => {
    if (status === 'success' && data?.data?.id) {
      router.push(`done/${data?.data?.id}`);
    }
  }, [status, data, router]);

  // METHODS
  const onSubmit = (data: FormValues): void => {
    createUserReflection({
      date: calendar.currentDate,
      name: data.name,
      reflectionModelID: 1,
      status: 'submitted',
      answers: Object.values(data).map((answer, index) => ({
        question: templates.find((t) => t.id === templateID)?.questions[index] || '',
        answer,
        order: index + 1,
      })),
    });
  };

  // VARS
  const questions = templates.find((t) => t.id === templateID)?.questions || [];

  return (
    <>
      <form
        className="mt-10 flex-1 overflow-auto flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register('name')} label="Name" placeholder="E.g. HR Meeting" />
        {questions.map((question, index) => (
          <div key={index}>
            <p className="text-md mb-2 font-semibold">
              {index + 1}. {question}
            </p>
            <textarea
              {...register(`question_${index + 1}`)}
              rows={3}
              className="
                bg-gray-700 p-2 border focus:ring-inset focus:ring-0
                focus:outline-none border-gray-100 rounded-md text-white w-full
              "
            />
          </div>
        ))}
        <div>
          <Button type="submit" isLoading={status === 'pending'} disabled={status === 'pending'}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default TemplateModel;
