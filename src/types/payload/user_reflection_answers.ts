export type CreateUserReflectionAnswer = {
  user_reflection_id: string;
  question: string;
  answer?: string;
  order: number;
};

export type UpdateUserReflectionAnswer = {
  id: string;
  question?: string;
  answer?: string;
  order?: number;
};
