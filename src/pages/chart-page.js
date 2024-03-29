import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';
import Button from '../components/button';

import Lost from '../images/lost.svg';
import Sailor from '../images/sailor.svg';
import BearingChart from '../components/bearingChart';

// --------------------------------------------------
// Functions
// --------------------------------------------------

const downloadPDF = () => {
  const chart = document.getElementById('bearingChart');
  // canvas.toDataUrl returns img at 96DPI, A4 paper dimensions are 1123x794px at this (landscape).
  const a4Width = 1123;
  const a4Height = 794;

  // if (chart) {
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
  // } else {
  // alert('PDF download only available on larger devices');
  // }
};

const downloadCSV = () => {
  const rows = document
    .getElementById('bearingChart')
    .getElementsByTagName('tr');
  console.log(rows);
  let csvContent = 'data:text/csv;charset=utf-8,';
  for (const rowEl of rows) {
    const row = rowEl.children;
    for (const cell of row) {
      csvContent += `${cell.innerHTML},`;
    }
    csvContent += '\n';
  }
  const encodedURI = encodeURI(csvContent);
  const dlLink = document.createElement('a');
  dlLink.setAttribute('href', encodedURI);
  dlLink.setAttribute('download', 'bearingChart.csv');
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
};

// --------------------------------------------------
// Styled components
// --------------------------------------------------
const FlexTile = styled(Tile)`
  display: flex;
`;

const ImageContainer = styled.div`
  order: 1;
  flex: 1;
  margin: 0 auto;
  align-self: center;
  text-align: center;
  min-width: 13em;

  @media (max-width: 60em) {
    display: none;
  }
`;

const Note = styled.p`
  font-size: 0.8rem;
  font-style: italic;
`;

const DownloadButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 30em) {
    flex-direction: column-reverse;
  }
`;

const SimpleLink = styled(Link)`
  text-decoration: none;
  font-size: 1.125em;
  font-weight: 400;
  color: ${`var(--dark-blue)`};
  opacity: 0.8;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    opacity: 1;
    color: var(--accent-blue);
    transform: translateY(-0.05em);
  }
`;

const LostImage = styled.img`
  width: 10%;
  height: auto;
  min-width: 10em;
  padding: 1em;
`;

class ChartPage extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const marks = location.state ? location.state.marks : []; // Allows gatsby to build (location not available whilst building)
    this.state = {
      marks,
      smallScreen: false,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ smallScreen: window.innerWidth < 960 });
  }

  render() {
    const { marks, smallScreen } = this.state;

    return (
      <Layout>
        <SEO title="Bearing chart" />

        {marks.length > 0 ? (
          <>
            <FlexTile>
              <div style={{ flex: 4 }}>
                <h1>Bearing chart</h1>
                <h2>All done! Your bearing chart can be found below.</h2>
                <p>
                  Chart is now available for download. For best results,
                  download is available on large devices only. To tweak
                  formatting, download as a CSV and open in a cell based editor
                  (e.g: Excel, Google Sheets).
                </p>
                <Note>
                  <strong>Note: </strong>All bearings given are true, no
                  magnetic variation has been accounted for.
                </Note>
              </div>
              <ImageContainer>
                <img
                  src={Sailor}
                  alt="Sailor"
                  style={{ width: `70%`, height: `auto` }}
                />
              </ImageContainer>
            </FlexTile>
            <Tile>
              <BearingChart marks={marks} showFullChart={!smallScreen} />
            </Tile>
          </>
        ) : (
          <FlexTile style={{ flexDirection: `column`, alignItems: `center` }}>
            <LostImage src={Lost} alt="Lost" />
            <p style={{ marginBottom: 0 }}>
              No marks defined. <Link to="/">Go back</Link> and define some?
            </p>
          </FlexTile>
        )}

        <DownloadButtons>
          <SimpleLink to="/" style={{ marginRight: `auto` }}>
            &#8592; Back to marks
          </SimpleLink>
          {!smallScreen && <Button onClick={downloadPDF}>Download PDF</Button>}
          {!smallScreen && (
            <Button primary onClick={downloadCSV}>
              Download CSV
            </Button>
          )}
        </DownloadButtons>
      </Layout>
    );
  }
}

ChartPage.propTypes = {
  location: PropTypes.array,
};

export default ChartPage;
