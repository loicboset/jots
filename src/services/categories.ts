import { Category } from '@/types/api/categories';
import { UpsertCategory } from '@/types/payload/categories';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// GET CATEGORIES
const getCategories = async (userID: string) => {
  const { data } = await axios.get(`/api/categories?user_id=${userID}`);
  return data;
};

const useCategories = (userID: string): UseQueryResult<Category[], Error> => {
  return useQuery({ queryKey: ['categories'], queryFn: () => getCategories(userID) });
};

// UPSERT CATEGORY
const upsertCategory = async (body: UpsertCategory) => {
  const { data } = await axios.put('/api/categories', body);
  return data;
};

const useUpsertCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export { useCategories, useUpsertCategory };
