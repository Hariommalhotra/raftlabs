// fetchPosts.ts
import { request } from 'graphql-request';
import { SUPABASE_URL } from '../supabaseClient';

const GRAPHQL_ENDPOINT = `${SUPABASE_URL}/graphql/v1`;

const GET_POSTS_QUERY = `
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(order_by: { created_at: desc }, limit: $limit, offset: $offset) {
      id
      user_id
      content
      image_url
      created_at
    }
  }
`;

export const fetchPosts = async (limit: number, offset: number) => {
  const variables = { limit, offset };
  const data = await request(GRAPHQL_ENDPOINT, GET_POSTS_QUERY, variables);
  return data;
};
