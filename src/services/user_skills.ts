import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { UserSkill } from "@/types/api/user_skills";
import { EditUserSkills } from "@/types/payload/user_skills";

// GET USER SKILLS
const getUserSkills = async (): Promise<UserSkill[]> => {
  const { data } = await axios.get(`/api/user_skills`);
  return data;
};

const useUserSkills = (): UseQueryResult<UserSkill[], Error> => {
  return useQuery({ queryKey: ["user_skills"], queryFn: () => getUserSkills() });
};

// UPSERT USER SKILLS
const editUserSkills = async (body: EditUserSkills): Promise<void> => {
  const { data } = await axios.put("/api/user_skills", body);
  return data;
};

const useEditUserSkills = (): UseMutationResult<void, Error, EditUserSkills, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUserSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_skills"] });
    },
  });
};

export { useUserSkills, useEditUserSkills };
