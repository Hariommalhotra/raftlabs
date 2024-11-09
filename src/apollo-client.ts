import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://zxyawcxvohlcwpffjxmn.supabase.co/graphql/v1', // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eWF3Y3h2b2hsY3dwZmZqeG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODYwMDksImV4cCI6MjA0NjY2MjAwOX0.-VhYMEohnw2PbGgIehHHsyOHuc0us0hKn8nWRFa8Os4',
  },
});

export default client;
