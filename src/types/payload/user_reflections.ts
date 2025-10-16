export type CreateUserReflection = {
  reflectionModelID: string;
  status: 'draft' | 'submitted';
  answers: {
    question: string;
    answer: string;
    order: number;
  }[];
};

export type UpdateUserReflection = {
  id: string;
  reflectionModelID: string;
  status: 'draft' | 'submitted';
};
