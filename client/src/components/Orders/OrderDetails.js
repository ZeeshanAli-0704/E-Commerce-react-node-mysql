import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./OrderDetails.scss";

const OrderDetails = (props) => {
  const orderId = props.orderId;
  const [order, setOrder] = useState({});
  const [productsInOrder, setProductsInOrder] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data[0]);
      })
      .catch((err) => console.log("error"));

    axios
      .get(`${getBaseURL()}api/orders/getProductsByOrder/${orderId}`)
      .then((res) => {
        setProductsInOrder(res.data);
      })
      .catch((err) => console.log("Error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackClick = () => {
    props.onBackClick(); // Go back to the previous page
  };

  return (
    <div className="order-details-container">
      <div className="back-button-container">
        <button onClick={handleBackClick}>Back</button>
      </div>
      <div>
        <label>Order Id</label>
        <input type="text" value={orderId} disabled></input>
      </div>
      <div>
        <label>Customer Name</label>
        <input type="text" value={order.fname} disabled></input>
      </div>

      <div>
        <label>Total Cost</label>
        <input type="text" value={order.totalPrice} disabled></input>
      </div>

      <div>
        <label>Order Date</label>
        <input type="text" value={order.createdDate} disabled></input>
      </div>
      <div>
        <label>Address</label>
        <input type="text" value={order.address} disabled></input>
      </div>

      <div>
        <h1>Products In the Order</h1>
        <table>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {productsInOrder.map((product) => {
              return (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
