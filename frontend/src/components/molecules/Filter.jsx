import React from 'react';

export default function Filter(props) {

  const { filterRobots, materials } = props;

  return (
    <div className="row mb-4">
      <div className="col">
        Filter By:
        <select className="form-select" aria-label="Default select example" onChange={filterRobots}>
          <option value="All">Select Material</option>
          {materials.map((material, index) => (
            <option key={index} value={material}>{material}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
