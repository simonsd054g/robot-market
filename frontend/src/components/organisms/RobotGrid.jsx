import React from 'react';

import Filter from '../molecules/Filter';
import Robot from '../molecules/Robot';

export default function RobotGrid(props) {

  const { robots } = props;

  return (
    <>
      <Filter {...props} />
      <div className="row">
        {robots.map((robot, index) =>
          <div key={index} className="col">
            <Robot id={index} robot={robot} {...props} />
          </div>
        )}
      </div>
    </>
  )
}
