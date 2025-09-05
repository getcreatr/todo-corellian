import { graphql } from 'relay-runtime';

export const GetAllTasksQuery = graphql`
  query GetAllTasksQuery {
    getAllTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;