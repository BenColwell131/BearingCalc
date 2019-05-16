import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Tile from '../components/tile';

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * (180 / Math.PI);
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * (Math.PI / 180);
};

// Converts a lat OR a long value from DDM lat/long format to DD lat.long format
function convertToDD(deg, min) {
  return deg + min / 60;
}

// Calculate bearing between two lat/long's in DD format
function calculateBearing(
  srcLatDeg,
  srcLatMin,
  srcLongDeg,
  srcLongMin,
  destLatDeg,
  destLatMin,
  destLongDeg,
  destLongMin
) {
  // Convert all lat/long to DD format
  const srcLat = convertToDD(srcLatDeg, srcLatMin);
  const srcLong = convertToDD(srcLongDeg, srcLongMin);
  const destLat = convertToDD(destLatDeg, destLatMin);
  const destLong = convertToDD(destLongDeg, destLongMin);

  const y =
    Math.sin(Math.radians(destLong) - Math.radians(srcLong)) *
    Math.cos(Math.radians(destLat));
  const x =
    Math.cos(Math.radians(srcLat)) * Math.sin(Math.radians(destLat)) -
    Math.sin(Math.radians(srcLat)) *
      Math.cos(Math.radians(destLat)) *
      Math.cos(Math.radians(destLong) - Math.radians(srcLong));
  let brng = Math.degrees(Math.atan2(y, x));

  // TODO: Comment below lines.
  brng = (brng + 360) % 360; //

  // TODO: Implement correct magnetic variation
  brng += 5; // Account for 5deg west variation of magnetic North.
  brng = Math.round(brng);

  return brng;
}

class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;

    this.state = {
      marks: location.state.marks,
    };
  }

  render() {
    const { marks } = this.state;
    return (
      <Layout>
        <SEO title="Page two" />
        <Tile>
          <h1>Bearing chart</h1>
          {marks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ backgroundColor: `#000` }}>From</th>
                  <th
                    colSpan={marks.length}
                    style={{ backgroundColor: `#000` }}
                  >
                    To
                  </th>
                </tr>
                <tr>
                  <th>-</th>
                  {marks.map(mark => (
                    <th scope="col">{mark.mark}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {marks.map(srcMark => (
                  <tr>
                    <th scope="row">{srcMark.mark}</th>
                    {marks.map(destMark => {
                      const bearing =
                        srcMark === destMark
                          ? '-'
                          : calculateBearing(
                              srcMark.latDeg,
                              srcMark.latMin,
                              srcMark.longDeg,
                              srcMark.longMin,
                              destMark.latDeg,
                              destMark.latMin,
                              destMark.longDeg,
                              destMark.longMin
                            );
                      return <td>{bearing}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              No marks defined. <Link to="/">Go back</Link> and define some?
            </p>
          )}
        </Tile>
        <p>{JSON.stringify(marks)}</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

ChartPage.propTypes = {
  location: PropTypes.array,
};
export default ChartPage;
