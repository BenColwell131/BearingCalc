import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';

import Boat from '../images/boat.svg';
import Delete from '../images/delete.svg';

// Styled Components
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

const StyledInputGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
  margin-right: 1em;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1em;
  font-weight: bold;
  opacity: 0.87;
`;

const StandardField = styled(Field)`
  border: 1px solid var(--dark-grey);
  border-radius: 5px;
  padding: 15px 15px;
  color: var(--dark-blue);
  /* width: 10rem; */
  width: 100%;
`;

const MiniField = styled(Field)`
  border: 1px solid var(--dark-grey);
  border-radius: 5px;
  padding: 15px 15px;
  color: var(--dark-blue);
  width: 4rem;
`;

const FieldUnit = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  padding: 0 0.2rem;
`;

const Button = styled.button`
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
  /* margin-left: auto; */
  cursor: pointer;
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

class IndexPage extends React.Component {
  state = {
    marks: [
      {
        mark: 'South Bar',
        letter: 'E',
        latDeg: '53',
        latMin: '20.22',
        longDeg: '6',
        longMin: '7.45',
      },
      {
        mark: 'New Ross',
        letter: 'G',
        latDeg: '53',
        latMin: '19.6',
        longDeg: '6',
        longMin: '6.3',
      },
      {
        mark: 'Saoirse',
        letter: 'B',
        latDeg: '53',
        latMin: '19.02',
        longDeg: '6',
        longMin: '8.15',
      },
      {
        mark: 'Middle',
        letter: 'M',
        latDeg: '53',
        latMin: '19.55',
        longDeg: '6',
        longMin: '7.48',
      },
      {
        mark: 'Boyd',
        letter: 'K',
        latDeg: '53',
        latMin: '18.85',
        longDeg: '6',
        longMin: '7.37',
      },
      {
        mark: 'Pier',
        letter: 'V',
        latDeg: '53',
        latMin: '18.1',
        longDeg: '6',
        longMin: '6.84',
      },
      {
        mark: 'South Bar',
        letter: 'E',
        latDeg: '53',
        latMin: '20.22',
        longDeg: '6',
        longMin: '7.45',
      },
      {
        mark: 'New Ross',
        letter: 'G',
        latDeg: '53',
        latMin: '19.6',
        longDeg: '6',
        longMin: '6.3',
      },
      {
        mark: 'Saoirse',
        letter: 'B',
        latDeg: '53',
        latMin: '19.02',
        longDeg: '6',
        longMin: '8.15',
      },
      {
        mark: 'Middle',
        letter: 'M',
        latDeg: '53',
        latMin: '19.55',
        longDeg: '6',
        longMin: '7.48',
      },
      {
        mark: 'Boyd',
        letter: 'K',
        latDeg: '53',
        latMin: '18.85',
        longDeg: '6',
        longMin: '7.37',
      },
      {
        mark: 'Pier',
        letter: 'V',
        latDeg: '53',
        latMin: '18.1',
        longDeg: '6',
        longMin: '6.84',
      },
    ],
  };

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
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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
          <Formik
            initialValues={{
              mark: '',
              letter: '',
              latDeg: '',
              latMin: '',
              longDeg: '',
              longMin: '',
            }}
            onSubmit={(values, actions) => {
              this.setState({
                marks: [...marks, values],
              });
              console.log(JSON.stringify(marks));
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {() => (
              <Form
                style={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  // flexWrap: `wrap`,
                  // TODO: Change flex direction on smaller screen sizes
                  // flexDirection: `column`,
                }}
              >
                <StyledInputGroup>
                  <StyledLabel>Markname:</StyledLabel>
                  <StandardField
                    name="mark"
                    type="text"
                    placeholder="Island"
                    autoComplete="off"
                  />
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Letter:</StyledLabel>
                  <StandardField
                    name="letter"
                    type="text"
                    placeholder="Letter"
                    autoComplete="off"
                  />
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Lattitude:</StyledLabel>
                  <div style={{ display: `flex` }}>
                    <MiniField
                      name="latDeg"
                      type="text"
                      placeholder="54"
                      autoComplete="off"
                    />
                    <FieldUnit>°</FieldUnit>
                    <StandardField
                      name="latMin"
                      type="text"
                      placeholder="94.2"
                      autoComplete="off"
                    />
                    <FieldUnit>'</FieldUnit>
                  </div>
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Longitude:</StyledLabel>
                  <div style={{ display: `flex` }}>
                    <MiniField
                      name="longDeg"
                      type="text"
                      placeholder="57"
                      autoComplete="off"
                    />
                    <FieldUnit>°</FieldUnit>
                    <StandardField
                      name="longMin"
                      type="text"
                      placeholder="92.2"
                      autoComplete="off"
                    />
                    <FieldUnit>'</FieldUnit>
                  </div>
                </StyledInputGroup>
                <Button type="submit">Add</Button>
              </Form>
            )}
          </Formik>
        </Tile>
        <Tile>
          <h1>Marks</h1>
          {marks.length > 0 ? (
            // TODO: Do i want this scroll?
            // <div style={{ maxHeight: `400px`, overflowY: `scroll` }}>
            <table>
              <thead>
                <tr>
                  <th>Markname</th>
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
                        <input
                          type="image"
                          src={Delete}
                          alt="Delete"
                          style={{
                            width: `20px`,
                            position: `absolute`,
                            right: `10px`,
                          }}
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
