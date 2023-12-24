export interface Todo {
  title: string;
  description: string;
  id?: number;
  checked: boolean;
}

export type Todos = Todo[];
