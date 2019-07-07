import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';

import Lost from '../images/lost.svg';

const LostImage = styled.img`
  width: 10%;
  height: auto;
  min-width: 10em;
  padding: 1em;
`;

const SimpleLink = styled(Link)`
  text-decoration: none;
  font-size: 1.125em;
  font-weight: 400;
  color: ${`var(--dark-blue)`};
  opacity: 0.8;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    opacity: 1;
    color: var(--accent-blue);
    transform: translateY(-0.05em);
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Tile
      style={{
        display: `flex`,
        alignItems: `center`,
        flexDirection: `column`,
      }}
    >
      <LostImage src={Lost} alt="Lost" />
      <h1>PAGE NOT FOUND</h1>
      <p>
        We can't seem to find the page you're looking for... how embarassing!
      </p>
      <SimpleLink to="/">Return home</SimpleLink>
    </Tile>
  </Layout>
);

export default NotFoundPage;
