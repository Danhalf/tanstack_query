import axios from 'axios';
import { Todo, Todos } from '../types/todos';

export const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todos>('todos')).data.map(
    (todo: Todo) => todo.id
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post<Todo>('todos', data);
};
