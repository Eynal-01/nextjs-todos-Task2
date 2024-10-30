import Link from 'next/link';

export async function getServerSideProps() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();

    return { props: { todos } };
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return { props: { todos: [] } }; 
  }
}

export default function TodosPage({ todos }) {
  if (!todos || todos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}