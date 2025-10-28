type CreateUserReflectionAssessment = {
  reflectionID: number;
  score: number;
  details?: {
    trait: string;
    score: number;
  }[];
};

export type { CreateUserReflectionAssessment };
