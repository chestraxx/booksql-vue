import gql from 'graphql-tag'

export const queryLogOut = gql`
  mutation {
    logout {
      message
    }
  }
`
