import { Suspense } from 'react';
import { RelayProvider } from '../components/RelayProvider';
import { TodoApp } from '../components/TodoApp';

export default function Home() {
  return (
    <RelayProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoApp />
      </Suspense>
    </RelayProvider>
  );
}