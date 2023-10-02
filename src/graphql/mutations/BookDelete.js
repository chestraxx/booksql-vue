import gql from 'graphql-tag'

export const queryBookDelete = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      id
      title
    }
  }
`
