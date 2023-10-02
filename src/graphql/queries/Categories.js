import gql from 'graphql-tag'

export const queryCategories = gql`
  query {
    categories {
      id
      name
    }
  }
`
