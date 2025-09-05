'use client';

import React, { useState } from 'react';
import { useMutation } from 'react-relay';
import {
  Button,
  Form,
  TextField,
  TextArea,
  Flex,
} from '@adobe/react-spectrum';
import { CreateTaskMutation } from '../mutations/CreateTask';
import type { CreateTaskMutation as CreateTaskMutationType } from '../mutations/__generated__/CreateTaskMutation.graphql';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  
  const [commitMutation] = useMutation<CreateTaskMutationType>(CreateTaskMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    commitMutation({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim() || null,
        },
      },
      onCompleted: () => {
        // Fast, immediate feedback
        setTitle('');
        setDescription('');
        setJustSubmitted(true);
        setIsSubmitting(false);
        
        // Brief success state
        setTimeout(() => {
          setJustSubmitted(false);
        }, 1000);
      },
      onError: (error) => {
        console.error('Failed to create task:', error);
        setIsSubmitting(false);
      },
      updater: (store) => {
        const root = store.getRoot();
        const newTask = store.getRootField('createTask');
        const tasks = root.getLinkedRecords('allTasks') || [];
        root.setLinkedRecords([...tasks, newTask], 'allTasks');
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
        <TextField
          label="Task Title"
          placeholder="What would you like to accomplish?"
          value={title}
          onChange={setTitle}
          isRequired
          validationState={title.trim() ? 'valid' : undefined}
          UNSAFE_style={{
            transition: 'all 0.3s ease'
          }}
        />
        
        <TextArea
          label="Description"
          placeholder="Add context, goals, or additional details..."
          value={description}
          onChange={setDescription}
          height="size-1200"
          UNSAFE_style={{
            transition: 'all 0.3s ease'
          }}
        />
        
        <Flex justifyContent="end" marginTop="size-300">
          <Button
            type="submit"
            variant="cta"
            isDisabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>⏳ Creating Magic...</>
            ) : justSubmitted ? (
              <>✅ Success!</>
            ) : (
              <>🚀 Create Task</>
            )}
          </Button>
        </Flex>
      </Form>
  );
}