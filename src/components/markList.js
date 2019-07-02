import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Delete from '../images/delete.svg';

// --------------------------------------------------
// Styled Components
// --------------------------------------------------
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

class MarksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullList: true,
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
    this.setState({ showFullList: window.innerWidth > 720 });
  }

  render() {
    const { showFullList } = this.state;
    const { marks, onMarkDelete } = this.props;
    let list;

    if (marks.length <= 0) {
      list = <NoMarksLabel>No marks added</NoMarksLabel>;
    } else if (showFullList) {
      list = (
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
                  <td style={{ overflowWrap: `break-word` }}>{mark.mark}</td>
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
                      onClick={e => onMarkDelete(index, e)}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      );
    } else {
      // Show shrunk table
      list = (
        <table>
          {marks.map((mark, index) => (
            <>
              <tr>
                <th style={{ width: `50%` }}>Markname</th>
                <td style={{ overflowWrap: `break-word` }}>{mark.mark}</td>
              </tr>
              <tr>
                <th>Letter</th>
                <td>{mark.letter}</td>
              </tr>
              <tr>
                <th>Lattitude</th>

                <td>
                  {mark.latDeg}° {mark.latMin}'
                </td>
              </tr>
              <tr>
                <th>Longitude</th>
                <td>
                  {mark.longDeg}° {mark.longMin}'
                  <DeleteIcon
                    type="image"
                    src={Delete}
                    alt="Delete"
                    onClick={e => onMarkDelete(index, e)}
                  />
                </td>
              </tr>
              {index !== marks.length - 1 && <tr />}
            </>
          ))}
        </table>
      );
    }

    return <>{list}</>;
  }
}

MarksList.propTypes = {
  marks: PropTypes.object.isRequired,
  onMarkDelete: PropTypes.func.isRequired,
};

export default MarksList;
