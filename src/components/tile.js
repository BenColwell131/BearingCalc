import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: white;
  border-radius: 7.5px;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(216, 216, 216, 0.16);
  padding: 2.5em;
  margin-bottom: 1em;

  @media (max-width: 30em) {
    padding: 2.5em 1.75em;
  }
`;

const Tile = ({ className, children, style }) => (
  <StyledDiv style={style} className={className}>
    {children}
  </StyledDiv>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Tile;
