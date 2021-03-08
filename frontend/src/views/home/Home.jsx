import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { cloneDeep, filter, findIndex, remove, sortBy } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRobots } from '../../features/robotSlice';
import Dashboard from '../../components/layouts/Dashboard';

const LoaderWrapper = styled.div`
  height: 80vh;
`;

export default function Home() {
  const dispatch = useDispatch();
  const originalRobots = useSelector(state => state?.robots?.robots);

  const [robots, setRobots] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([]);

  const filterRobots = (e) => {
    const { value } = e.target;
    if (value === "All") {
      setRobots(originalRobots);
    } else {
      const newRobots = filter(originalRobots, { material: value });
      setRobots(newRobots);
    }
  }

  const addToCart = (item) => {
    const index = findIndex(cartItems, { uuid: item.uuid })
    let newCart = cloneDeep(cartItems);
    if (item.stock === 0 || (index >= 0 && newCart[index].addedPieces === item.stock)) {
      toast("Out of stock");
      return;
    }
    if (index < 0 && newCart.length === 5) {
      toast("Cannot add more than 5 different types of robots");
    } else {
      if (index >= 0) {
        newCart.splice(index, 1, { ...item, addedPieces: cartItems[index].addedPieces + 1 });
      } else {
        newCart.push({ ...item, addedPieces: 1 });
      }
      setCartItems(newCart);
    }
  }

  const removeFromCart = (item) => {
    const index = findIndex(cartItems, { uuid: item.uuid })
    let newCart = cloneDeep(cartItems);
    if (item.addedPieces > 1) {
      newCart.splice(index, 1, { ...item, addedPieces: item.addedPieces - 1 });
    } else {
      remove(newCart, { uuid: item.uuid });
    }
    setCartItems(newCart);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/robots`).then(res => {
      let robots = res.data.data.map((robot) => ({
        uuid: uuid4(),
        ...robot
      }));
      robots = sortBy(robots, (robot) => robot.name);
      setRobots(robots);
      dispatch(createRobots(robots));
      setMaterials([...new Set(robots.map((robot) => robot.material))].sort());
    });
  }, []);

  if (!robots) {
    return (
      <LoaderWrapper className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </LoaderWrapper>
    )
  }

  return (
    <div>
      <Dashboard
        robots={robots}
        originalRobots={originalRobots}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        materials={materials}
        filterRobots={filterRobots}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
      />
    </div>
  )
}
