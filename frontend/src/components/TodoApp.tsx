'use client';

import React, { Suspense } from 'react';
import {
  Provider,
  defaultTheme,
  Heading,
} from '@adobe/react-spectrum';
import { RelayProvider } from './RelayProvider';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { TaskListSkeleton } from './TaskSkeleton';
import '../styles/globals.css';

export function TodoApp() {
  return (
    <RelayProvider>
      <Provider theme={defaultTheme} colorScheme="light">
        <div className="app-container">
          <div className="main-card">
            {/* Beautiful Header */}
            <div className="app-header">
              <Heading level={1} UNSAFE_className="brand-title">
                Corellian Software
              </Heading>
              <Heading level={3} UNSAFE_className="brand-subtitle">
                Elegant Task Management
              </Heading>
            </div>

            {/* Content Area */}
            <div className="app-content">
              {/* Form Section */}
              <div className="form-section">
                <Heading level={4} UNSAFE_className="section-title">
                  Create New Task
                </Heading>
                <TaskForm />
              </div>

              {/* Tasks Section */}
              <div className="tasks-section">
                <Suspense fallback={<TaskListSkeleton count={4} />}>
                  <TaskList />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </RelayProvider>
  );
}

