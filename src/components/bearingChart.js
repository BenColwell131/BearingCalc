import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// --------------------------------------------------
// Functions
// --------------------------------------------------

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * (180 / Math.PI);
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * (Math.PI / 180);
};

// Calculate bearing between two lat/long's in DD format
function calculateBearing(srcLat, srcLong, destLat, destLong) {
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

// --------------------------------------------------
// Styled components
// --------------------------------------------------

const SingleMarkTable = styled.table`
  margin-bottom: 2em;
  border-bottom: 2px solid;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

class BearingChart extends Component {
  render() {
    const { marks, showFullChart } = this.props;
    let chart;

    if (showFullChart) {
      chart = (
        <table id="bearingChart" style={{ overflow: `scroll` }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: `#000`, width: `10%` }}>From</th>
              <th style={{ backgroundColor: `#000` }} />
              <th colSpan={marks.length} style={{ backgroundColor: `#000` }}>
                To
              </th>
            </tr>
            <tr>
              <th />
              <th />
              {marks.map(mark => (
                <th scope="col">{mark.mark}</th>
              ))}
            </tr>
            <tr>
              <th />
              <th />
              {marks.map(mark => (
                <th scope="col">{mark.letter && mark.letter}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {marks.map(srcMark => (
              <tr>
                <th scope="row">{srcMark.mark}</th>
                <th scope="row">{srcMark.letter && srcMark.letter}</th>
                {marks.map(destMark => {
                  const bearing =
                    srcMark === destMark
                      ? '-'
                      : calculateBearing(
                          srcMark.lat,
                          srcMark.long,
                          destMark.lat,
                          destMark.long
                        );
                  return <td>{bearing}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      chart = (
        <>
          {marks.map(srcMark => (
            <SingleMarkTable>
              <tbody>
                <tr>
                  <th style={{ width: `60%` }}>{srcMark.mark}</th>
                  <th>{srcMark.letter}</th>
                </tr>
                <tr>
                  <th colSpan={2} style={{ backgroundColor: `#000` }}>
                    To
                  </th>
                </tr>
                {marks.map(destMark => {
                  const res =
                    srcMark !== destMark ? (
                      <tr>
                        <td>
                          {destMark.mark} ( {destMark.letter} )
                        </td>
                        <td>
                          {calculateBearing(
                            srcMark.lat,
                            srcMark.long,
                            destMark.lat,
                            destMark.long
                          )}
                        </td>
                      </tr>
                    ) : null;
                  return <>{res}</>;
                })}
              </tbody>
            </SingleMarkTable>
          ))}
        </>
      );
    }

    return <>{chart}</>;
  }
}

BearingChart.propTypes = {
  marks: PropTypes.object.isRequired,
  showFullChart: PropTypes.bool.isRequired,
};
export default BearingChart;
