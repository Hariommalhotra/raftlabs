import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($userId: ID!) {
    postsCollection {
      edges {
        node {
          user_id
          image_url
          created_at
          content
          user_name
        }
      }
    }
  }
`;
