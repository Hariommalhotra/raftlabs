// src/queries/createPost.ts
import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $content: String!, $image: Upload) {
    createPost(userId: $userId, content: $content, image: $image) {
      id
      content
      createdAt
    }
  }
`;
