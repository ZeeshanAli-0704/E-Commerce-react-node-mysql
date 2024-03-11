import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./OrdersByProductId.scss";

const OrdersByProductId = (props) => {
  const [orderListByProductId, setOrderListByProductId] = useState([]);
  const productId = props.productId;

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/products/allOrderByProductId/${productId}`)
      .then((res) => {
        console.log(res);
        setOrderListByProductId(res.data);
      })
      .catch((err) => console.log("Error found"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orders-by-product">
      <h1> Orders of This Product</h1>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {orderListByProductId.map((order) => {
            return (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.fname} {order.lname}
                </td>
                <td>{order.createdDate}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersByProductId;
