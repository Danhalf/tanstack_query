import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../types/todos';
import { createTodo } from './api';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log('mutate');
    },
    onError: () => {
      console.error('mutate error');
    },
    onSuccess: () => {
      console.info('mutate success');
    },
    onSettled: async (_, error) => {
      console.info('mutate settled');
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] });
      }
    },
  });
};
