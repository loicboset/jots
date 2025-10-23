type ReflectionModel = {
  id: number;
  name: string;
  reflection_model_questions: {
    id: number;
    order: number;
    question: string;
  }[];
};

export type { ReflectionModel };
