import gql from 'graphql-tag'

export const queryBookCreate = gql`
  mutation (
    $title: String!
    $author: String!
    $image: String
    $description: String
    $link: String
    $featured: Boolean
    $category: Int!
  ) {
    createBook(
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
