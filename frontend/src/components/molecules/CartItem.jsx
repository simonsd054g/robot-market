import React from 'react';
import styled from 'styled-components';
import { find } from 'lodash';

const Card = styled.div`
  width: 200px;
`;

export default function CartItem(props) {

  const { item, originalRobots, addToCart, removeFromCart } = props;

  let date = new Date(item.createdAt);
  date = ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + date.getFullYear();

  const robot = find(originalRobots, { uuid: item.uuid });

  return (
    <Card className="card mb-3">
      <div className="fs-5 px-3 text-secondary">{item.name}</div>
      <div className="card-body pt-0 pb-0">
        <h5 className="card-title text-danger">฿{Intl.NumberFormat('en-EN').format(item.price)}</h5>
        <p className="text-black-50">
          {item.addedPieces} {item.addedPieces === 1 ? "piece" : "pieces"} added<br />
        </p>
        <div className="row">
          <div className="col-sm">
            <a className="btn btn-outline-success btn-sm w-100" onClick={() => addToCart(robot)}>+</a>
          </div>
          <div className="col-sm">
            <a className="btn btn-outline-danger btn-sm w-100" onClick={() => removeFromCart(item)}>-</a>
          </div>
        </div>
        <hr />
        <p className="text-danger">Sub Total: ฿{Intl.NumberFormat('en-EN').format(item.price*item.addedPieces)}</p>
      </div>
    </Card>
  )
}
