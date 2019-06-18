import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';
import AddMarkForm from '../components/addMarkForm';

import Boat from '../images/boat.svg';
import Delete from '../images/delete.svg';

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

const NoMarksLabel = styled.p`
  width: 100%;
  padding: 2em;
  opacity: 0.75;
  text-align: center;
  font-size: 1em;
  font-weight: 500;
  color: var(--dark-blue);
  border: 2px dashed rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  margin: 0;
`;

const DeleteIcon = styled.input`
  width: 20px;
  position: absolute;
  right: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: [],
    };

    this.handleMarkAdd = this.handleMarkAdd.bind(this);
    // ? Why doesnt handleMarkDelete need to be bound as well?
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
    // TODO: link this with marks object from form
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
          ]}
        />
        <FlexTile>
          <div style={{ flex: 4 }}>
            <h1>Welcome</h1>
            <p>
              Shrouds hornswaggle grapple lookout haul wind parrel flogging hulk
              lad doubloon.
            </p>
            <p style={{ fontWeight: `300`, marginBottom: 0 }}>
              Shrouds hornswaggle grapple lookout haul wind parrel flogging hulk
              lad doubloon. Handsomely spanker nipper rope's end scourge of the
              seven seas cackle fruit Sea Legs boatswain topmast dance the
              hempen jig.
            </p>
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
          {marks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ width: `30%` }}>Markname</th>
                  <th>Letter</th>
                  <th>Lattitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark, index) => (
                  <>
                    <tr>
                      <td style={{ overflowWrap: `break-word` }}>
                        {mark.mark}
                      </td>
                      <td>{mark.letter}</td>
                      <td>
                        {mark.latDeg}° {mark.latMin}'
                      </td>
                      <td>
                        {mark.longDeg}° {mark.longMin}'
                        <DeleteIcon
                          type="image"
                          src={Delete}
                          alt="Delete"
                          onClick={e => this.handleMarkDelete(index, e)}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <NoMarksLabel>No marks added</NoMarksLabel>
          )}
        </Tile>
        <ButtonLink to="/bearing-chart/" state={{ marks }}>
          Generate bearing chart
        </ButtonLink>
      </Layout>
    );
  }
}

export default IndexPage;
