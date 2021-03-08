import React from 'react';
import styled from 'styled-components';

import RobotGrid from '../organisms/RobotGrid';
import Cart from '../organisms/Cart';

const Row = styled.div`
  border-top: 2px solid #aaaaaa;
  padding-top: 15px;
`;

const VerticalLine = styled.div`
  height: 100vh;
  width: 2px;
  background: #aaaaaa;
`;

export default function Dashboard(props) {
  return (
    <>
      <div className="container">
        <Row className="row">
          <div className="col-sm-8">
            <RobotGrid {...props} />
          </div>
          <div className="col-sm-1">
            <div className="sticky-top d-flex justify-content-center">
              <VerticalLine />
            </div>
          </div>
          <div className="col-sm-3">
          <div className="sticky-top">
            <Cart {...props} />
            </div>
          </div>
        </Row>
      </div>
    </>
  )
}
