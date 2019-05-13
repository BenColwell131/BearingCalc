import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

// Component imports
import Header from './header';
import Container from './container';

// Style
import './normalize.css';
import './layout.css';

const App = styled.div`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Main = styled.main`
  padding: 20px 40px;
  &:before {
    content: '';
    background-color: var(--dark-blue);
    display: block;
    height: 175px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 0;
  }
`;
const Footer = styled.footer`
  margin-top: auto;
  position: relative;
  padding: 20px 40px;
  background-color: var(--dark-blue);
  color: white;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <App>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main>
          <Container>{children}</Container>
        </Main>
        <Footer>
          <Container>© {new Date().getFullYear()}, Ben Colwell</Container>
        </Footer>
      </App>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
