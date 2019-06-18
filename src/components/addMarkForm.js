import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
// TODO: can probably cut down this import
import * as Yup from 'yup';

import Button from './button';

// --------------------------------------------------
// Functions
// --------------------------------------------------

// Converts a lat OR a long value from DDM lat/long format to DD lat.long format
function convertToDD(deg, min) {
  return deg + min / 60;
}

// Validation schema for new mark form
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

// --------------------------------------------------
// Styled Components
// --------------------------------------------------
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

class AddMarkForm extends Component {
  render() {
    const { onMarkAdd } = this.props;

    return (
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
          onMarkAdd(values); // Update state in index.js

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
                title={errors.letter && touched.letter ? errors.letter : null}
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
                  title={errors.latDeg && touched.latDeg ? errors.latDeg : null}
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
                  title={errors.latMin && touched.latMin ? errors.latMin : null}
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
                  placeholder={errors.longDeg && touched.longDeg ? `!` : '57'}
                  errorCase={!!(errors.longDeg && touched.longDeg)}
                  title={
                    errors.longDeg && touched.longDeg ? errors.longDeg : null
                  }
                  autoComplete="off"
                />
                <FieldUnit>°</FieldUnit>
                <StandardField
                  name="longMin"
                  type="text"
                  placeholder={
                    errors.longMin && touched.longMin ? errors.longMin : '92.8'
                  }
                  errorCase={!!(errors.longMin && touched.longMin)}
                  title={
                    errors.longMin && touched.longMin ? errors.longMin : null
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
    );
  }
}

AddMarkForm.propTypes = {
  onMarkAdd: PropTypes.func.isRequired,
};

export default AddMarkForm;
