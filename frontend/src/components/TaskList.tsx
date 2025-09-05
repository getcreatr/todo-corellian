'use client';

import React, { useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import {
  ListView,
  Item,
  ActionButton,
  Text,
  Heading,
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import TaskListIcon from '@spectrum-icons/workflow/TaskList';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { GetAllTasksQuery } from '../queries/GetAllTasksQuery';
import { UpdateTaskStatusMutation } from '../mutations/UpdateTaskStatus';
import type { GetAllTasksQuery as GetAllTasksQueryType, TaskStatus } from '../queries/__generated__/GetAllTasksQuery.graphql';
import type { UpdateTaskStatusMutation as UpdateTaskStatusMutationType } from '../mutations/__generated__/UpdateTaskStatusMutation.graphql';

interface Task {
  readonly id: number;
  readonly title: string;
  readonly description: string | null | undefined;
  readonly status: TaskStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function TaskList() {
  const data = useLazyLoadQuery<GetAllTasksQueryType>(GetAllTasksQuery, {});
  const [updatingTasks, setUpdatingTasks] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const [commitMutation] = useMutation<UpdateTaskStatusMutationType>(UpdateTaskStatusMutation);

  const handleStatusToggle = (task: Task) => {
    const newStatus: TaskStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    // Block any action if currently updating this task
    if (updatingTasks.has(task.id)) return;

    // Add visual feedback for task being updated
    setUpdatingTasks(prev => new Set(prev).add(task.id));

    commitMutation({
      variables: {
        input: {
          id: task.id,
          status: newStatus,
        },
      },
      onCompleted: () => {
        // Trigger confetti: only when completing a task
        if (task.status === 'PENDING' && newStatus === 'COMPLETED') {
          setShowConfetti(true);
          // Auto-hide confetti after animation
          setTimeout(() => setShowConfetti(false), 2000);
        }

        // Fast update
        setUpdatingTasks(prev => {
          const newSet = new Set(prev);
          newSet.delete(task.id);
          return newSet;
        });
      },
      onError: (error) => {
        console.error('Failed to update task:', error);
        setUpdatingTasks(prev => {
          const newSet = new Set(prev);
          newSet.delete(task.id);
          return newSet;
        });
      },
    });
  };

  const tasks = data.allTasks || [];

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <TaskListIcon size="XL" UNSAFE_className="empty-icon" />
        <Heading level={4} UNSAFE_className="empty-title">
          No tasks yet
        </Heading>
        <Text UNSAFE_className="empty-text">
          Create your first task above to begin your productive journey. Every great achievement starts with a single step!
        </Text>
      </div>
    );
  }

  // Sort tasks: pending first, completed last  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'PENDING' && b.status === 'COMPLETED') return -1;
    if (a.status === 'COMPLETED' && b.status === 'PENDING') return 1;
    // Within same status, sort by most recent update
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
          colors={['#a67c52', '#c0a080', '#b3906f', '#d4c8aa']}
          gravity={0.8}
          wind={0.2}
          initialVelocityX={{ min: -15, max: 15 }}
          initialVelocityY={{ min: 10, max: 30 }}
          friction={0.99}
          tweenDuration={1500}
          confettiSource={{
            x: 0,
            y: 0,
            w: width,
            h: 0
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        />
      )}
      <div className="tasks-header">
        <Heading level={4} UNSAFE_className="section-title tasks-title">
          Your Tasks
        </Heading>
        {tasks.length > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div className="progress-text">
              {tasks.filter(t => t.status === 'COMPLETED').length} of {tasks.length} completed
            </div>
            <Text UNSAFE_style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              opacity: 0.6,
              marginTop: '0.25rem'
            }}>
              ↑ Active tasks  •  ↓ Completed tasks
            </Text>
          </div>
        )}
      </div>

      <ListView
        items={sortedTasks}
        width="100%"
        height="auto"
        maxHeight="600px"
      >
        {(task) => (
          <Item
            key={task.id}
            textValue={task.title}
          >
            <div className="task-content">
              {/* Task Header with Status and Actions */}
              <div className="task-header">
                <div className="task-info">
                  {/* Status Badge with Animation */}
                  <div
                    className={`task-status ${task.status.toLowerCase()}`}
                    style={{
                      animation: 'bounceIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      animationFillMode: 'both'
                    }}
                  >
                    {task.status === 'COMPLETED' ? '✨ Completed' : '🔄 Pending'}
                  </div>

                  {/* Task Title */}
                  <Heading
                    level={5}
                    UNSAFE_className={`task-title ${task.status === 'COMPLETED' ? 'completed' : ''}`}
                  >
                    {task.title}
                  </Heading>

                  {/* Task Description */}
                  {task.description && (
                    <Text UNSAFE_className="task-description">
                      {task.description}
                    </Text>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="task-actions" style={{ display: 'flex', gap: 'var(--space-sm)', flexShrink: 0 }}>
                  {/* Complete/Uncomplete Button */}
                  <ActionButton
                    onPress={() => handleStatusToggle(task)}
                    aria-label={`Mark as ${task.status === 'PENDING' ? 'completed' : 'pending'}`}
                    isQuiet
                    isDisabled={updatingTasks.has(task.id)}
                    UNSAFE_className="task-action"
                    UNSAFE_style={{
                      opacity: updatingTasks.has(task.id) ? 0.5 : 1,
                      transform: updatingTasks.has(task.id) ? 'scale(0.95)' : 'scale(1)',
                      animation: updatingTasks.has(task.id) ? 'pulse 1s ease-in-out infinite' : 'none',
                      background: task.status === 'COMPLETED'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(166, 124, 82, 0.1)',
                      borderColor: task.status === 'COMPLETED'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(166, 124, 82, 0.2)'
                    }}
                  >
                    {updatingTasks.has(task.id) ? (
                      <>⏳</>
                    ) : task.status === 'PENDING' ? (
                      <CheckmarkCircle size="M" />
                    ) : (
                      <Clock size="M" />
                    )}
                  </ActionButton>
                </div>
              </div>

              {/* Task Footer with Date */}
              <div className="task-footer">
                <Text UNSAFE_className="task-date">
                  Updated {new Date(task.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </div>
            </div>
          </Item>
        )}
      </ListView>
    </>
  );
}