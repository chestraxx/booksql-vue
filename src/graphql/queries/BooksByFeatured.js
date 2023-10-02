import gql from 'graphql-tag'

export const queryBooksByFeatured = gql`
  query ($featured: Boolean!) {
    booksByFeatured(featured: $featured) {
      id
      title
      author
      image
    }
  }
`
