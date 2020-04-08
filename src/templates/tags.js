import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import { rhythm } from "../utils/typography"

const TagsTemplate = ({ pageContext, data }) => {
    return (
    <Layout location={pageContext} title={`${pageContext.tag} ${data.allMarkdownRemark.totalCount}件`}>
      <SEO title={pageContext.tag} />
      <Bio />
      {data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
          <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <small><Tags tags={node.frontmatter.tags}></Tags></small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
      })}
    </Layout>
  )
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
        limit: 1000
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt(truncate: true)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        description
                        tags
                    }
                }
            }
        }
    }
`
