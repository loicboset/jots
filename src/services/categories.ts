import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';

import { Category } from '@/types/api/categories';
import { UpsertCategory } from '@/types/payload/categories';

// GET CATEGORIES
const getCategories = async (userID: string): Promise<Category[]> => {
  const { data } = await axios.get(`/api/categories?user_id=${userID}`);
  return data;
};

const useCategories = (userID: string): UseQueryResult<Category[], Error> =>
  useQuery({ queryKey: ['categories'], queryFn: () => getCategories(userID) });

// UPSERT CATEGORY
const upsertCategory = async (body: UpsertCategory): Promise<void> => {
  const { data } = await axios.put('/api/categories', body);
  return data;
};

const useUpsertCategory = (): UseMutationResult<void, Error, UpsertCategory, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// DELETE CATEGORY
const deleteCategory = async (id: number): Promise<void> => {
  const { data } = await axios.delete(`/api/category/${id}`);
  return data;
};

const useDeleteCategory = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export { useCategories, useUpsertCategory, useDeleteCategory };
