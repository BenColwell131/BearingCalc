import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';
import ExcellentExport from 'excellentexport';

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
  // TODO: Currently convert each lat/long numerous times
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

const downloadPDF = () => {
  const chart = document.getElementById('PDFContainer');
  // canvas.toDataUrl returns img at 96DPI, A4 paper dimensions are 1123x794 at this (landscape).
  const a4Width = 1123;
  const a4Height = 794;

  html2canvas(chart).then(canvas => {
    // scale if canvas > A4
    if (canvas.width > a4Width || canvas.height > a4Height) {
      // scale by whichever scale factor is smaller (e.g: shrinks canvas more)
      const scaleFactor =
        a4Width / canvas.width < a4Height / canvas.height
          ? a4Width / canvas.width
          : a4Height / canvas.height;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);

      canvas.width *= scaleFactor;
      canvas.height *= scaleFactor;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        tempCanvas,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    // canvas is an SVG, convert to PNG
    const pngChart = canvas.toDataURL('image/png');
    const pdf = new JSPDF({ orientation: 'landscape' });
    pdf.addImage(pngChart, 'PNG', 0, 0);
    pdf.save('bearingChart.pdf');
  });
};

const downloadCSV = () => {
  const chart = document.getElementById('PDFContainer');

  const bearingChart = document.getElementById('bearingChart');
  return ExcellentExport.convert(
    { anchor: chart, filename: 'bearingChart.csv', format: 'csv' },
    [{ name: 'Sheet 1', from: { table: bearingChart } }]
  );
};

// TODO: This is in both pages, abstract to its own component file
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
  display: block; //!This is new
`;
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
          <div id="PDFContainer">
            {marks.length > 0 ? (
              <table id="bearingChart" style={{ overflow: `scroll` }}>
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
                      <th scope="col">
                        {mark.mark}
                        {mark.letter && <> ({mark.letter})</>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {marks.map(srcMark => (
                    <tr>
                      <th scope="row">
                        {srcMark.mark}
                        {srcMark.letter && <> ({srcMark.letter})</>}
                      </th>
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
          </div>
        </Tile>
        <Button onClick={downloadPDF}>Download PDF</Button>
        <a download="bearingChart.csv" href="#" onClick={downloadCSV}>
          Download CSV
        </a>
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
