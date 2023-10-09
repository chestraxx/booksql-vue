import gql from 'graphql-tag'

export const queryLogin = gql`
  mutation ($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
    }
  }
`
