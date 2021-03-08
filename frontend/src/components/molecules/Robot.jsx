import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findIndex } from 'lodash';

const Card = styled.div`
  width: 220px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const RobotImage = styled.img`
  height: 150px;
`;

export default function Robot(props) {

  const { id, robot, addToCart, cartItems } = props;
  const [image, setImage] = useState(robot.image);

  useEffect(() => {
    setImage(robot.image);
  }, [robot]);

  let date = new Date(robot.createdAt);
  date = ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + date.getFullYear();

  const index = findIndex(cartItems, { uuid: robot.uuid });

  const remainingPieces = index >= 0 ? robot.stock - cartItems[index].addedPieces : robot.stock;

  return (
    <Card className="card mb-3">
      <div className="text-center fs-5 p-2 text-secondary">{robot.name}</div>
      <RobotImage id={`robot-${id}`} src={image} className="card-img-top" alt="Robot"
        onError={() => setImage("/images/robot-default.jpg")} />
      <div className="card-body">
        <h5 className="card-title text-danger">฿{Intl.NumberFormat('en-EN').format(robot.price)}</h5>
        <p className="text-black-50">
          {remainingPieces} {remainingPieces === 1 ? "piece" : "pieces"} remaining<br />
          Created on {date}<br />
          Material: {robot.material}
        </p>
        <button className="btn btn-primary w-100" disabled={robot.stock === 0 || cartItems[index]?.addedPieces === robot.stock} onClick={() => addToCart(robot)}>Add to Cart</button>
      </div>
    </Card>
  )
}
