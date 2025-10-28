export type UserReflectionStatus = 'draft' | 'submitted';

export type UserReflectionAnswer = {
  id: string;
  order: number;
  question: string;
  answer: string;
};

export type UserReflection = {
  id: string;
  user_id: string;
  reflection_model_id: number;
  status: UserReflectionStatus;
  name: string;
  user_reflection_answers: UserReflectionAnswer[];
  user_reflection_assessments: {
    score: number;
  }[];
  created_at: string;
  updated_at: string;
};
