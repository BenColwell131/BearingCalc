import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props =>
    props.primary ? `var(--accent-blue)` : 'white'};
  color: ${props => (props.primary ? 'white' : `var(--accent-blue)`)};
  padding: 15px 30px;
  border-radius: 7px;
  font-size: 1.125em;
  opacity: 1;
  font-weight: 500;
  margin-top: auto;
  cursor: pointer;
  border: 2px solid var(--accent-blue);
  display: block;
  transition: all 0.2s ease-in-out;
  width: min-content;
  white-space: nowrap;

  &:hover,
  &:focus {
    box-shadow: 0 0.5em 0.5em -0.4em var(--accent-blue);
    transform: translateY(-0.15em);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }

  &:last-of-type {
    margin-left: 1em;
  }

  @media (max-width: 45em) {
    width: 100%;
  }

  @media (max-width: 30em) {
    margin-bottom: 0.5em;
    &:nth-child(2) {
      margin-left: 0;
    }
  }
`;

const Button = ({ children, primary, onClick, style, type }) => (
  <StyledButton primary={primary} onClick={onClick} style={style} type={type}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
