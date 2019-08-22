import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import PostListing from "../components/Posts/PostListing";
import Layout from "../components/Layout";
import FeatureSection from "../components/FeatureSection";
import Img from "gatsby-image";
import videoImage from "../images/netlifyDevVideo.jpg";
import courseImage from "../images/courseImage.jpg";
import talkImage from "../images/talkImage.jpg";
import Link from "../components/Link";

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 35px;
  justify-items: stretch;
  margin-bottom: 40px;

  @media all and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

export default ({
  data: { allMarkdownRemark, allFeedOverlapPodcast },
  location,
  history,
}) => {
  const blogpost = allMarkdownRemark.edges[0].node;
  return (
    <Layout location={location} history={history}>
      <IntroText>
        I'm a Front-End Engineer in New Haven, Connecticut making fast and
        awesome websites and apps.
      </IntroText>
      <IntroText>
        I'm always learning and sharing what I've learned. Here are some ways
        you can find what I've been up to.
      </IntroText>
      {/* <FeatureSection
      reverse
      sectionTitle="Blog"
      gatsbyImage={
        allMarkdownRemark.edges[0].node.frontmatter.image.childImageSharp
      }
      itemTitle={allMarkdownRemark.edges[0].node.frontmatter.title}
      ctaText="Go to Blog"
      ctaLink="/posts"
      styleNumber={1}
    >
      <p>Test</p>
    </FeatureSection> */}
      <FeatureSection
        reverse
        sectionTitle="Blog"
        gatsbyImage={blogpost.frontmatter.image.childImageSharp}
        ctaText="Go to Blog"
        ctaLink="/posts"
        styleNumber={1}
      >
        <p>
          I occasionally write articles about programming, teaching, design,
          soft skills, etc.
        </p>
        <p>
          Check out my latest post,{" "}
          <Link to={blogpost.fields.slug}>{blogpost.frontmatter.title}</Link>
        </p>
      </FeatureSection>
      <FeatureSection
        sectionTitle="Podcast"
        imageUrl={allFeedOverlapPodcast.edges[0].node.itunes.image}
        ctaText="Go to The Overlap"
        ctaLink="https://www.overlappodcast.com"
        styleNumber={2}
      >
        <p>
          I co-host a podcast on the intersection Design and Development with my
          cousin, Elle. We touch on topics like typography, React, freelancing,
          and more.{" "}
        </p>

        <p>
          Subscribe in your podcast player and listen to our latest episode,{" "}
          <b>{allFeedOverlapPodcast.edges[0].node.title}</b>.
        </p>
      </FeatureSection>

      <FeatureSection
        reverse
        sectionTitle="Courses"
        imageUrl={courseImage}
        ctaText="Go to Skillshare"
        ctaLink="https://www.skillshare.com"
        styleNumber={3}
      >
        <p>
          I've created a course for Skillshare that teaches all about animating
          an SVG scene with GreenSock! We cover the basics of SVG, how to set up
          the scene, and how to use GreenSock to make seamless animations.{" "}
          <b>Coming Soon!</b>
        </p>
      </FeatureSection>
      <FeatureSection sectionTitle="Talks" imageUrl={talkImage} styleNumber={4}>
        <b>Upcoming Talks</b>
        <ul>
          <li>
            <a href="https://devfestnh.com">Google Devfest New Haven 2019</a>
          </li>
        </ul>
      </FeatureSection>
      <FeatureSection
        reverse
        sectionTitle="Videos"
        imageUrl={videoImage}
        ctaText="Go to Youtube"
        ctaLink="https://www.youtube.com/user/alexrtrost/videos"
        styleNumber={1}
      >
        <p>
          Sometimes I'll livestream or record videos on programming on Youtube.
        </p>
      </FeatureSection>
    </Layout>
  );
};

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    allFeedOverlapPodcast(sort: { fields: isoDate, order: DESC }, limit: 1) {
      edges {
        node {
          itunes {
            image
          }
          title
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "blog" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          html
          excerpt(pruneLength: 180)
        }
      }
    }
  }
`;
