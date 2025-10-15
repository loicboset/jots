import { GOALSOPTIONS, ROLESOPTIONS } from '@/utils/constants';

type Name = 'role' | 'experience' | 'goal';

type Step = {
  title: string;
  input: { name: Name; type: string; options?: string[] };
};

const steps = new Map<number, Step>([
  [
    1,
    {
      title: 'What best describe your current role (or the one you want to get)?',
      input: {
        name: 'role',
        type: 'select',
        options: ROLESOPTIONS,
      },
    },
  ],
  [
    2,
    {
      title: 'How many years of experience do you have?',
      input: { name: 'experience', type: 'number' },
    },
  ],
  [
    3,
    {
      title: 'What is your main professional goal?',
      input: {
        name: 'goal',
        type: 'select',
        options: GOALSOPTIONS,
      },
    },
  ],
]);

export default steps;
