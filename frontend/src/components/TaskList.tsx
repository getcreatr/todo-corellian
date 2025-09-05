'use client';

import React from 'react';
import {
  ListView,
  Item,
  ActionButton,
  Flex,
  Text,
  View,
  StatusLight,
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

export function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
  const handleStatusToggle = async (task: Task) => {
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
              updateTaskStatus(input: $input) {
                id
                title
                description
                status
                createdAt
                updatedAt
              }
            }
          `,
          variables: {
            input: {
              id: task.id,
              status: newStatus,
            },
          },
        }),
      });

      const result = await response.json();
      
      if (result.data?.updateTaskStatus) {
        onTaskUpdated();
      } else {
        console.error('Failed to update task:', result.errors);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (tasks.length === 0) {
    return (
      <View padding="size-400">
        <Text>No tasks yet. Add your first task above!</Text>
      </View>
    );
  }

  return (
    <ListView
      items={tasks}
      maxWidth="100%"
      height="400px"
    >
      {(task) => (
        <Item key={task.id} textValue={task.title}>
          <Flex direction="column" gap="size-100">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap="size-200">
                <StatusLight
                  variant={task.status === 'COMPLETED' ? 'positive' : 'notice'}
                >
                  {task.status === 'COMPLETED' ? 'Completed' : 'Pending'}
                </StatusLight>
                <Text>{task.title}</Text>
              </Flex>
              <ActionButton
                onPress={() => handleStatusToggle(task)}
                aria-label={`Mark as ${task.status === 'PENDING' ? 'completed' : 'pending'}`}
              >
                {task.status === 'PENDING' ? (
                  <CheckmarkCircle />
                ) : (
                  <Clock />
                )}
              </ActionButton>
            </Flex>
            {task.description && (
              <Text variant="detail">{task.description}</Text>
            )}
          </Flex>
        </Item>
      )}
    </ListView>
  );
}