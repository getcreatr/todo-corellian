'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Provider,
  defaultTheme,
  View,
  Heading,
  Divider,
  Grid,
} from '@adobe/react-spectrum';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getAllTasks {
                id
                title
                description
                status
                createdAt
                updatedAt
              }
            }
          `,
        }),
      });
      
      const result = await response.json();
      if (result.data?.getAllTasks) {
        setTasks(result.data.getAllTasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRefresh = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Provider theme={defaultTheme}>
      <View padding="size-400" maxWidth="800px" margin="0 auto">
        <Heading level={1} marginBottom="size-200">
          Corellian Software
        </Heading>
        <Heading level={2} marginBottom="size-400">
          Task Manager
        </Heading>
        
        <Grid areas={['form', 'divider', 'list']} gap="size-400">
          <View gridArea="form">
            <TaskForm onTaskCreated={handleRefresh} />
          </View>
          
          <View gridArea="divider">
            <Divider />
          </View>
          
          <View gridArea="list">
            {loading ? (
              <View padding="size-400">Loading tasks...</View>
            ) : (
              <TaskList 
                tasks={tasks} 
                onTaskUpdated={handleRefresh}
              />
            )}
          </View>
        </Grid>
      </View>
    </Provider>
  );
}