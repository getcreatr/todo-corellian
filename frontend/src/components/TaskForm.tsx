'use client';

import React, { useState } from 'react';
import {
  Button,
  Form,
  TextField,
  TextArea,
} from '@adobe/react-spectrum';
import { useMutation } from 'react-relay';
import { CreateTaskMutation } from '../mutations/CreateTask';

interface TaskFormProps {
  onTaskCreated: () => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [commitMutation, isMutationInFlight] = useMutation(CreateTaskMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    commitMutation({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim() || undefined,
        },
      },
      onCompleted: () => {
        setTitle('');
        setDescription('');
        onTaskCreated();
      },
      onError: (error) => {
        console.error('Failed to create task:', error);
      },
    });
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
        isDisabled={!title.trim() || isMutationInFlight}
      >
        {isMutationInFlight ? 'Creating...' : 'Add Task'}
      </Button>
    </Form>
  );
}