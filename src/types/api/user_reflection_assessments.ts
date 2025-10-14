type UserReflectionAssessment = {
  id: number;
  user_reflection_id: number;
  score: number;
  user_reflection_assessment_details: {
    trait: string;
    score: number;
  }[];
};

export type { UserReflectionAssessment };
