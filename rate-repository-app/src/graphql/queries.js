import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          name
          id
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
