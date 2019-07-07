import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';
import AddMarkForm from '../components/addMarkForm';
import MarksList from '../components/markList';

import Boat from '../images/boat.svg';

// --------------------------------------------------
// Styled Components
// --------------------------------------------------

const FlexTile = styled(Tile)`
  display: flex;
`;

const ImageContainer = styled.div`
  order: 1;
  flex: 1;
  margin-left: 40px;
  align-self: center;
  text-align: center;

  @media (max-width: 60em) {
    display: none;
  }
`;

const ButtonLink = styled(Link)`
  padding: 15px 30px;
  border: none;
  background-color: var(--accent-blue);
  color: white;
  border-radius: 7px;
  font-size: 1.125em;
  opacity: 1;
  font-weight: 500;
  height: min-content;
  margin-top: auto;
  margin-left: auto;
  display: block;
  width: min-content;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  text-align: center;

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

  @media (max-width: 45em) {
    width: 100%;
  }
`;

const Note = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  margin-bottom: 0;
`;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: [],
    };

    this.handleMarkAdd = this.handleMarkAdd.bind(this);
    this.handleMarkDelete = this.handleMarkDelete.bind(this);
  }

  handleMarkAdd(values) {
    this.setState(prevState => ({
      marks: [...prevState.marks, values],
    }));
  }

  handleMarkDelete(index, e) {
    const { marks } = this.state;
    e.preventDefault();
    // Remove unwanted mark
    marks.splice(index, 1); // Throw away result (don't need it)
    this.setState({
      marks,
    });
  }

  render() {
    const { marks } = this.state;

    return (
      <Layout>
        <SEO
          title="Home"
          keywords={[
            `sailing`,
            `bearing chart`,
            `bearing`,
            `generator`,
            `racing`,
            `round the cans`,
          ]}
        />
        <FlexTile>
          <div style={{ flex: 4 }}>
            <h1>Welcome</h1>
            <h2>
              Create your own bearing charts for quick reference while sailing!
            </h2>
            <p>
              To create your custom chart, define all the marks you'd like
              included below and sit back! The site will calculate all bearings
              between each mark and present them in a table for quick reference.
              Charts can then also be downloaded in CSV or PDF format.
            </p>
            <Note>
              <strong>Note:</strong> Co-ordinates should be given in{' '}
              <strong>DDM</strong> format.
            </Note>
          </div>
          <ImageContainer>
            <img
              src={Boat}
              alt="Boat"
              style={{ width: `60%`, height: `auto` }}
            />
          </ImageContainer>
        </FlexTile>
        <Tile>
          <h1>Add Mark</h1>
          <AddMarkForm onMarkAdd={this.handleMarkAdd} />
        </Tile>
        <Tile>
          <h1>Marks</h1>
          <MarksList marks={marks} onMarkDelete={this.handleMarkDelete} />
        </Tile>
        <ButtonLink to="/chart-page/" state={{ marks }}>
          Generate bearing chart
        </ButtonLink>
      </Layout>
    );
  }
}

export default IndexPage;
