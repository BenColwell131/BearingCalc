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
`;

const Tile = ({ className, children }) => (
  <StyledDiv className={className}>{children}</StyledDiv>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tile;
