import gql from 'graphql-tag'

export const queryBook = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      title
      author
      image
      description
      link
      featured
      category {
        id
        name
      }
    }
  }
`
