import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Component imports
import Container from './container.js';

// Asset imports
import logo from '../images/compass.svg';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  margin: 0;
  margin-left: 1rem;
  font-size: 1.5em;
  color: white;
  opacity: 1;
`;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `var(--dark-blue)`,
      padding: `30px 40px 20px 40px`,
      zIndex: `9`,
    }}
  >
    <StyledContainer>
      <img src={logo} alt="logo" style={{ width: `60px`, height: `100%` }} />
      <PageTitle>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </PageTitle>
    </StyledContainer>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
