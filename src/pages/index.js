import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tile from '../components/tile';

import Boat from '../images/boat.svg';

const StyledTile = styled(Tile)`
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

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StyledTile>
      <div style={{ flex: 4 }}>
        <h1>Welcome</h1>
        <p>
          Shrouds hornswaggle grapple lookout haul wind parrel flogging hulk lad
          doubloon.
        </p>
        <p style={{ fontWeight: `300`, marginBottom: 0 }}>
          Shrouds hornswaggle grapple lookout haul wind parrel flogging hulk lad
          doubloon. Handsomely spanker nipper rope's end scourge of the seven
          seas cackle fruit Sea Legs boatswain topmast dance the hempen jig.
        </p>
      </div>
      <ImageContainer>
        <img src={Boat} alt={Boat} style={{ width: `60%`, height: `auto` }} />
      </ImageContainer>
    </StyledTile>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
