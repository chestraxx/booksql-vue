import gql from 'graphql-tag'

export const queryBooks = gql`
  query {
    books {
      id
      title
      author
      image
    }
  }
`
