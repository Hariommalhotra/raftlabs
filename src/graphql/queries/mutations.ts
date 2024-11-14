import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($userId: String!, $content: String!, $imageUrl: String, $user_name: String) {
    insertIntopostsCollection(
      objects: [
        {
          user_id: $userId,
          content: $content,
          image_url: $imageUrl
          user_name: $user_name
        }
      ]
    ) {
      affectedCount
      records {
        id
        content
        image_url
        created_at
      }
    }
  }
`;
