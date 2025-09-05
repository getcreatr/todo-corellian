import { graphql } from 'relay-runtime';

export const UpdateTaskStatusMutation = graphql`
  mutation UpdateTaskStatusMutation($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;