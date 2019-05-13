import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: auto;

  @media (max-width: 60em) {
    max-width: 42rem;
  }

  @media (max-width: 45em) {
    max-width: 30rem;
  }
`;

const Container = ({ className, children }) => (
  <StyledDiv className={className}>{children}</StyledDiv>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
