import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';

import Boat from '../images/boat.svg';

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
`;

const StyledLabel = styled.label`
  font-size: 1em;
  font-weight: bold;
  opacity: 0.87;
`;

const StyledField = styled(Field)`
  border: 1px solid var(--dark-grey);
  border-radius: 5px;
  padding: 15px 15px;
  color: var(--dark-blue);
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
`;

class IndexPage extends React.Component {
  state = {
    marks: [],
  };

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
              alt={Boat}
              style={{ width: `60%`, height: `auto` }}
            />
          </ImageContainer>
        </FlexTile>
        <Tile>
          <h1>Add Mark</h1>
          <Formik
            initialValues={{ markname: '', letter: '', lat: 99.9, long: 99.9 }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                this.setState({
                  marks: [...marks, values],
                });
                // marks.push(values);
                console.log(JSON.stringify(marks));
              }, 10);
            }}
          >
            {() => (
              <Form
                style={{ display: `flex`, justifyContent: `space-between` }}
              >
                <StyledInputGroup>
                  <StyledLabel>Markname:</StyledLabel>
                  <StyledField
                    name="markname"
                    type="text"
                    placeholder="Markname"
                  />
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Letter:</StyledLabel>
                  <StyledField name="letter" type="text" placeholder="Letter" />
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Lattitude:</StyledLabel>
                  <StyledField name="lat" type="number" />
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Longitude:</StyledLabel>
                  <StyledField name="long" type="number" />
                </StyledInputGroup>
                <Button type="submit" style={{ marginLeft: `auto` }}>
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Tile>
        <Tile>
          <h1>Marks</h1>
          {console.log(JSON.stringify(marks))}
          <ol>
            {marks.map((mark, index) => (
              <li
                key={index}
                style={{ display: `flex`, justifyContent: `space-between` }}
              >
                <p>{mark.markname}</p>
                <p>{mark.letter}</p>
                <p>{mark.lat}</p>
                <p>{mark.long}</p>
              </li>
            ))}
          </ol>
        </Tile>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    );
  }
}

export default IndexPage;
