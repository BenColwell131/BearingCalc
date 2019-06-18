import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
// TODO: can probably cut down this import
import * as Yup from 'yup';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';
import Button from '../components/button';

import Boat from '../images/boat.svg';
import Delete from '../images/delete.svg';

// --------------------------------------------------
// Functions
// --------------------------------------------------

// Converts a lat OR a long value from DDM lat/long format to DD lat.long format
function convertToDD(deg, min) {
  return deg + min / 60;
}

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

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 60em) {
    flex-direction: column;
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

  @media (max-width: 60em) {
    margin-bottom: 1em;
  }
`;

const StyledLabel = styled.label`
  font-size: 1em;
  font-weight: bold;
  opacity: 0.87;
`;

const StandardField = styled(Field)`
  border: ${props =>
    props.errorCase ? `1px solid var(--error)` : `1px solid var(--dark-grey)`};
  color: var(--dark-blue);
  border-radius: 5px;
  padding: 15px 15px;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: var(--accent-blue);
    transform: translateY(-1px);
  }

  ::placeholder {
    color: ${props => (props.errorCase ? `var(--error)` : `var(--dark-blue)`)};
    opacity: ${props => (props.errorCase ? `1` : `0.7`)};
  }
`;

const MiniField = styled(StandardField)`
  width: 4rem;
`;

const FieldUnit = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  padding: 0 0.2rem;
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

const formValidationSchema = Yup.object().shape({
  mark: Yup.string()
    .min(3, 'Too short!')
    .required('Required'),
  letter: Yup.string()
    .max(3, 'Too Long!')
    .required('Required'),
  latDeg: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be >= 0')
    .max(89, 'Must be <= 90')
    .integer('Must be a whole number')
    .required('Required'),
  latMin: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be >= 0')
    .max(59.9999, 'Must be <= 60')
    .required('Required'),
  longDeg: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be >= 0')
    .max(179, 'Must be <= 179')
    .integer('Must be a whole number')
    .required('Required'),
  longMin: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Must be >= 0')
    .max(59.9999, 'Must be <= 60')
    .required('Required'),
});
class IndexPage extends Component {
  state = {
    // TODO: Placeholder marks used for testing.
    marks: [],
    //   marks: [
    //     {
    //       mark: 'South Bar',
    //       letter: 'E',
    //       latDeg: '53',
    //       latMin: '20.22',
    //       longDeg: '6',
    //       longMin: '7.45',
    //     },
    //     {
    //       mark: 'New Ross',
    //       letter: 'G',
    //       latDeg: '53',
    //       latMin: '19.6',
    //       longDeg: '6',
    //       longMin: '6.3',
    //     },
    //     {
    //       mark: 'Saoirse',
    //       letter: 'B',
    //       latDeg: '53',
    //       latMin: '19.02',
    //       longDeg: '6',
    //       longMin: '8.15',
    //     },
    //     {
    //       mark: 'Middle',
    //       letter: 'M',
    //       latDeg: '53',
    //       latMin: '19.55',
    //       longDeg: '6',
    //       longMin: '7.48',
    //     },
    //     {
    //       mark: 'Boyd',
    //       letter: 'K',
    //       latDeg: '53',
    //       latMin: '18.85',
    //       longDeg: '6',
    //       longMin: '7.37',
    //     },
    //     {
    //       mark: 'Pier',
    //       letter: 'V',
    //       latDeg: '53',
    //       latMin: '18.1',
    //       longDeg: '6',
    //       longMin: '6.84',
    //     },
    //     {
    //       mark: 'South Bar',
    //       letter: 'E',
    //       latDeg: '53',
    //       latMin: '20.22',
    //       longDeg: '6',
    //       longMin: '7.45',
    //     },
    //     {
    //       mark: 'New Ross',
    //       letter: 'G',
    //       latDeg: '53',
    //       latMin: '19.6',
    //       longDeg: '6',
    //       longMin: '6.3',
    //     },
    //     {
    //       mark: 'Saoirse',
    //       letter: 'B',
    //       latDeg: '53',
    //       latMin: '19.02',
    //       longDeg: '6',
    //       longMin: '8.15',
    //     },
    //     {
    //       mark: 'Middle',
    //       letter: 'M',
    //       latDeg: '53',
    //       latMin: '19.55',
    //       longDeg: '6',
    //       longMin: '7.48',
    //     },
    //     {
    //       mark: 'Boyd',
    //       letter: 'K',
    //       latDeg: '53',
    //       latMin: '18.85',
    //       longDeg: '6',
    //       longMin: '7.37',
    //     },
    //     {
    //       mark: 'Pier',
    //       letter: 'V',
    //       latDeg: '53',
    //       latMin: '18.1',
    //       longDeg: '6',
    //       longMin: '6.84',
    //     },
    //   ],
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
          <Formik
            initialValues={{
              mark: '',
              letter: '',
              latDeg: '',
              latMin: '',
              longDeg: '',
              longMin: '',
            }}
            validationSchema={formValidationSchema}
            onSubmit={(values, actions) => {
              // Convert all input lat/long to DD format
              values.lat = convertToDD(values.latDeg, values.latMin);
              values.long = convertToDD(values.longDeg, values.longMin);

              this.setState({
                marks: [...marks, values],
              });

              actions.resetForm();
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <StyledInputGroup>
                  <StyledLabel>Markname:</StyledLabel>
                  <StandardField
                    name="mark"
                    type="text"
                    placeholder={
                      errors.mark && touched.mark ? errors.mark : 'Island'
                    }
                    errorCase={!!(errors.mark && touched.mark)}
                    title={errors.mark && touched.mark ? errors.mark : null}
                    autoComplete="off"
                  />
                  {/* {errors.mark && touched.mark ? (
                    <div>{errors.mark}</div>
                  ) : null} */}
                </StyledInputGroup>
                <StyledInputGroup>
                  <StyledLabel>Letter:</StyledLabel>
                  <StandardField
                    name="letter"
                    type="text"
                    placeholder={
                      errors.letter && touched.letter ? errors.letter : 'Letter'
                    }
                    errorCase={!!(errors.letter && touched.letter)}
                    title={
                      errors.letter && touched.letter ? errors.letter : null
                    }
                    autoComplete="off"
                  />
                </StyledInputGroup>
                {/* TODO abstract out into component */}
                <StyledInputGroup>
                  <StyledLabel>Lattitude:</StyledLabel>
                  <div style={{ display: `flex` }}>
                    <MiniField
                      name="latDeg"
                      type="text"
                      placeholder={errors.latDeg && touched.latDeg ? `!` : '54'}
                      errorCase={!!(errors.latDeg && touched.latDeg)}
                      title={
                        errors.latDeg && touched.latDeg ? errors.latDeg : null
                      }
                      autoComplete="off"
                    />
                    <FieldUnit>°</FieldUnit>
                    <StandardField
                      name="latMin"
                      type="text"
                      placeholder={
                        errors.latMin && touched.latMin ? errors.latMin : '94.2'
                      }
                      errorCase={!!(errors.latMin && touched.latMin)}
                      title={
                        errors.latMin && touched.latMin ? errors.latMin : null
                      }
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
                      placeholder={
                        errors.longDeg && touched.longDeg ? `!` : '57'
                      }
                      errorCase={!!(errors.longDeg && touched.longDeg)}
                      title={
                        errors.longDeg && touched.longDeg
                          ? errors.longDeg
                          : null
                      }
                      autoComplete="off"
                    />
                    <FieldUnit>°</FieldUnit>
                    <StandardField
                      name="longMin"
                      type="text"
                      placeholder={
                        errors.longMin && touched.longMin
                          ? errors.longMin
                          : '92.8'
                      }
                      errorCase={!!(errors.longMin && touched.longMin)}
                      title={
                        errors.longMin && touched.longMin
                          ? errors.longMin
                          : null
                      }
                      autoComplete="off"
                    />
                    <FieldUnit>'</FieldUnit>
                  </div>
                </StyledInputGroup>
                <Button type="Submit" style={{ marginLeft: `auto` }}>
                  Add
                </Button>
              </StyledForm>
            )}
          </Formik>
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
