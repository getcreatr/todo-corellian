'use client';

import React, { useState, useCallback } from 'react';
import {
  Provider,
  defaultTheme,
  View,
  Heading,
  Divider,
  Grid,
} from '@adobe/react-spectrum';
import { useLazyLoadQuery } from 'react-relay';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { GetAllTasksQuery } from '../queries/GetAllTasks';

export function TodoApp() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const data = useLazyLoadQuery(GetAllTasksQuery, {}, {
    fetchKey: refreshKey,
  });

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <Provider theme={defaultTheme}>
      <View padding="size-400" maxWidth="800px" margin="0 auto">
        <Heading level={1} marginBottom="size-400">
          My Tasks
        </Heading>
        
        <Grid areas={['form', 'divider', 'list']} gap="size-400">
          <View gridArea="form">
            <TaskForm onTaskCreated={handleRefresh} />
          </View>
          
          <View gridArea="divider">
            <Divider />
          </View>
          
          <View gridArea="list">
            <TaskList 
              tasks={data.getAllTasks || []} 
              onTaskUpdated={handleRefresh}
            />
          </View>
        </Grid>
      </View>
    </Provider>
  );
}