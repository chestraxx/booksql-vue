import gql from 'graphql-tag'

export const queryBookEdit = gql`
  mutation (
    $id: ID!
    $title: String!
    $author: String!
    $image: String
    $description: String
    $link: String
    $featured: Boolean
    $category: Int!
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      image: $image
      description: $description
      link: $link
      featured: $featured
      category_id: $category
    ) {
      id
      title
    }
  }
`
