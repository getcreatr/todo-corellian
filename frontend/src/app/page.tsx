import { TodoApp } from '../components/TodoApp';

// Force dynamic rendering to prevent build-time GraphQL calls
export const dynamic = 'force-dynamic';

export default function Home() {
  return <TodoApp />;
}