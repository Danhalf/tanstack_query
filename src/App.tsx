import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL, getTodosIds } from './services/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTodosIds().then((data) => setData(data));
    // axios
    //   .get(`${BASE_URL}/todos`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     setData(error.message);
    //   });
  }, []);

  if (typeof data === 'string') {
    return data;
  }

  return (
    <>
      Todos: Raw: {<pre>{JSON.stringify(data, null, 2)}</pre>}
      <br />
      {data.map((todo: Record<string, string>) => (
        <div key={todo.id}>{todo?.title}</div>
      ))}
    </>
  );
}

export default App;
