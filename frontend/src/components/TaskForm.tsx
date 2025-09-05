'use client';

import React, { useState } from 'react';
import {
  Button,
  Form,
  TextField,
  TextArea,
} from '@adobe/react-spectrum';

interface TaskFormProps {
  onTaskCreated: () => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateTask($input: CreateTaskInput!) {
              createTask(input: $input) {
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
              title: title.trim(),
              description: description.trim() || undefined,
            },
          },
        }),
      });

      const result = await response.json();
      
      if (result.data?.createTask) {
        setTitle('');
        setDescription('');
        onTaskCreated();
      } else {
        console.error('Failed to create task:', result.errors);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} maxWidth="size-5000">
      <TextField
        label="Task Title"
        value={title}
        onChange={setTitle}
        isRequired
        maxWidth="100%"
      />
      <TextArea
        label="Description (optional)"
        value={description}
        onChange={setDescription}
        maxWidth="100%"
      />
      <Button
        type="submit"
        variant="cta"
        isDisabled={!title.trim() || isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Add Task'}
      </Button>
    </Form>
  );
}