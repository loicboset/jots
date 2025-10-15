export type UserReflectionStatus = "draft" | "submitted";

export type UserReflection = {
  id: string;
  user_id: string;
  reflection_model_id: string | null;
  status: UserReflectionStatus;
  created_at: string;
  updated_at: string;
};
