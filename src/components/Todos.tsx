import { UseQueryResult } from '@tanstack/react-query';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo } from '../types/todos';
import { useCreateTodo } from '../services/mutations';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Todo.module.css';

export const Todos = () => {
  const { isError, data, refetch } = useTodosIds();
  const todosQueries = useTodos(data);

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data: Todo) => {
    createTodoMutation.mutate(data);
    refetch();
  };

  if (isError) {
    return <span>Sometimes mistakes happen</span>;
  }

  return (
    <>
      <div className={styles.todosGrid}>
        {todosQueries.map(({ data }: UseQueryResult<Todo>, idx: number) => {
          return (
            <div key={data?.id || idx} className={styles.todoCard}>
              <div className={styles.todoId}>Id: {data?.id}</div>
              <div className={styles.todoDetails}>
                <strong>Title:</strong> {data?.title} <br />
                <strong>Description:</strong> {data?.description}
              </div>
            </div>
          );
        })}
      </div>
      <form
        className={styles.todoForm}
        onSubmit={handleSubmit(handleCreateTodoSubmit)}
      >
        <h4>New todo:</h4>
        <div className={styles.formGroup}>
          <input
            className={styles.formInput}
            placeholder="Title"
            {...register('title')}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.formInput}
            placeholder="Description"
            {...register('description')}
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
