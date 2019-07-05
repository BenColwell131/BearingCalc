import React, { Component } from 'react';
import Layout from '../components/layout';
import Tile from '../components/tile';

class test extends Component {
  render() {
    return (
      <Layout>
        <Tile>
          <div
            style={{
              border: `3px solid red`,
              display: `flex`,
              height: `50px`,
              justifyContent: `space-between`,
            }}
          >
            <div
              style={{
                background: `aqua`,
                textAlign: `center`,
                flex: `1 1 30%`,
                minWidth: `0`,
              }}
            >
              111111111111111111111111111
            </div>
            <div
              style={{
                background: `green`,
                color: `white`,
                textAlign: `center`,
                flex: `1 0 30%`,
              }}
            >
              2
            </div>
            <div
              style={{
                background: `purple`,
                color: `white`,
                textAlign: `center`,
                flex: `1 0 30%`,
                display: `flex`,
              }}
            >
              <div style={{ flex: `1 0 25%` }}>3a</div>
              <div style={{ flex: `1 0 25%` }}>3b</div>
              <div style={{ flex: `1 0 25%` }}>3c</div>
            </div>
            <div
              style={{
                background: `lime`,
                textAlign: `center`,
                flex: `1 0 30%`,
              }}
            >
              4
            </div>
            <div>Hello</div>
          </div>
        </Tile>
      </Layout>
    );
  }
}

export default test;
