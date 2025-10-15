export type CreateUserReflection = {
  reflection_model_id: string;
  status?: "draft" | "submitted";
};

export type UpdateUserReflection = {
  id: string;
  reflection_model_id?: string;
  status?: "draft" | "submitted";
};
