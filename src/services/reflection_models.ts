import { ReflectionModel } from '@/types/api/reflection_models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// GET USER_REFLECTIONS
const getReflectionModels = async (): Promise<ReflectionModel[]> => {
  const { data } = await axios.get('/api/reflection_models');
  return data;
};

const useReflectionModels = (): UseQueryResult<ReflectionModel[], Error> =>
  useQuery({
    queryKey: ['reflection_models'],
    queryFn: () => getReflectionModels(),
  });

export { useReflectionModels };
