import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Resume from "../../components/Resume";
import Pomodoro from "../../components/Pomodoro";
import LinkCard from "../../components/LinkCard";
import styled from "styled-components";

const LinkCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  button:first-child {
    margin-right: 1rem;
  }
`;

const About = ({ data, location, history }) => (
  <Layout
    location={location}
    history={history}
    pageData={{
      title: "About",
      desc:
        "Bio and Resume for New Haven based web developer, Alex Trost. He writes about Javascript, React, Gatsby, the web, productivity and more.",
    }}
  >
    <div>
      <h1>About</h1>
      <p>
        Hey, I’m Alex Trost, a Front-end Developer from Philadelphia, now living
        in New Haven. I like solving problems and eliminating repetitive tasks
        with code. I learned Python and JavaScript to help teachers focus on the
        kids and let computers stress about the rest.
      </p>

      <p>
        I worked in a data-intense school and realized I wasn’t nearly as good
        at parsing the hundreds of data points as a computer would be. So my
        first summer vacation, I taught myself Python so I could make a Django
        webapp. My little school of 300 kids and teachers use it to make
        learning just a bit easier.
      </p>

      <p>
        I tossed a lot of problems at my web app and wanted to take my learning
        further, so I got a Google Developer Challenge Scholarship to help me
        learn JavaScript and frameworks like React. I've worked at GoNation as a
        Front-End Developer and now work at Green Check Verified as a Software
        Engineer.
      </p>
    </div>
    <LinkCardContainer>
      <LinkCard heading="Resume" path="/about/resume" />
      <LinkCard heading="Habit Tracking" path="/about/tracker" />
    </LinkCardContainer>
  </Layout>
);

export default About;