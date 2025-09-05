import { graphql } from 'relay-runtime';

export const GetAllTasksQuery = graphql`
  query GetAllTasksQuery {
    allTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;