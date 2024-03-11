import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./CustomerOrders.scss"; // Import the CSS file

const CustomerOrders = (props) => {
  const [pastOrders, setPastOrders] = useState([]);
  const customerId = sessionStorage.getItem("customerId");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders/myPastOrders/${customerId}`)
      .then((res) => {
        setPastOrders(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="customer-orders-container">
      <h1>My Orders</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Name</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pastOrders.map((order) => {
              return (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.name}</td>
                  <td>{order.createdDate}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
