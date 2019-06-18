import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Tile from '../components/tile';
import Button from '../components/button';

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

const downloadPDF = () => {
  const chart = document.getElementById('bearingChart');
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
  // alert('To be implemented');
  const rows = document
    .getElementById('bearingChart')
    .getElementsByTagName('tr');

  let csvContent = 'data:text/csv;charset=utf-8,';
  for (const rowEl of rows) {
    const row = rowEl.children;
    // console.log(row);
    for (const cell of row) {
      // console.log(cell.innerHTML);
      csvContent += `${cell.innerHTML},`;
    }
    csvContent += '\n';
  }
  // console.log(csvContent);
  const encodedURI = encodeURI(csvContent);
  const dlLink = document.createElement('a');
  dlLink.setAttribute('href', encodedURI);
  dlLink.setAttribute('download', 'bearingChart.csv');
  document.body.appendChild(dlLink);
  dlLink.click();
};

// Styled components

const DownloadButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 30em) {
    flex-direction: column;
  }
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
          {marks.length > 0 ? (
            <table id="bearingChart" style={{ overflow: `scroll` }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: `#000`, width: `10%` }}>
                    From
                  </th>
                  <th style={{ backgroundColor: `#000` }} />
                  <th
                    colSpan={marks.length}
                    style={{ backgroundColor: `#000` }}
                  >
                    To
                  </th>
                </tr>
                <tr>
                  <th />
                  <th />
                  {marks.map(mark => (
                    <th scope="col">
                      {mark.mark}
                      {/* {mark.letter && <> ({mark.letter})</>} */}
                    </th>
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
          ) : (
            <p>
              No marks defined. <Link to="/">Go back</Link> and define some?
            </p>
          )}
        </Tile>
        <DownloadButtons>
          <Button onClick={downloadPDF}>Download PDF</Button>
          <Button primary onClick={downloadCSV}>
            Download CSV
          </Button>
        </DownloadButtons>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

ChartPage.propTypes = {
  location: PropTypes.array,
};
export default ChartPage;
