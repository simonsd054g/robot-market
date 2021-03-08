import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import CartItem from '../molecules/CartItem';

const CartWrapper = styled.div`
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default function Cart(props) {

  const { cartItems } = props;

  const totalAmt = cartItems.reduce(((acc, cur) => (acc + cur.addedPieces)), 0);
  const totalPrice = cartItems.reduce(((acc, cur) => (acc + cur.addedPieces * cur.price)), 0);

  if (isEmpty(cartItems)) {
    return (
      <div>
        <p className="text-center text-black-50 fs-4">Cart</p>
        <div className="text-center">
          No item to display
        </div>
      </div>
    )
  }

  return (
    <CartWrapper>
      <p className="text-center text-black-50 fs-4">Cart</p>
      <div className="d-flex align-items-center flex-column">
        {cartItems.map((item, index) => {
          return (
            <div key={`cart-item-${index}`}>
              <CartItem item={item} {...props} />
            </div>
          )
        })}
      </div>
      <table className="table table-striped table-borderless">
        <tbody>
          <tr>
            <th scope="row">Total Amount</th>
            <td>{totalAmt}</td>
          </tr>
          <tr>
            <th scope="row">Total Price</th>
            <td>฿{Intl.NumberFormat('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice)}</td>
          </tr>
        </tbody>
      </table>
    </CartWrapper>
  )
}
