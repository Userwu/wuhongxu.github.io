import * as React from 'react'
import Blog, { IndexProps } from '../containers/BlogContainer'
import { graphql } from 'gatsby'

export default (props: IndexProps) => (
  <Blog {...props} />
)

export const pageQuery = graphql`
  query TemplateBlogPage($skip: Int) {
    # Get tags
    tags: allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: { regex: "/blog/" } }
      limit: 10
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          wordCount {
            words
          }
          excerpt(format:HTML)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            updatedDate(formatString: "YYYY年MM月DD日")
            tags
            origin
          }
        }
      }
    }
    dataJson {
      author {
        avatar {
          childrenImageSharp {
            gatsbyImageData(width: 35, height: 35)
          }
        }
      }
    }
  }
`

// {
//   childrenImageSharp {
//     gatsbyImageData(width: 35, height: 35)
//   }
// }