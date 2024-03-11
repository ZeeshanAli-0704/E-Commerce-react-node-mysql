import React, { useState } from "react";
import CustomerProductList from "../ProductList/CustomerProductList";
import CustomerOrders from "./CustomerOrders";
import "./CustomerContainer.scss";

const CustomerContainer = (props) => {
  const [isProductsActive, setIsProductsActive] = useState(true);

  const changeList = () => {
    setIsProductsActive(!isProductsActive);
  };

  return (
    <div className="customer-container">
      <div>
        {isProductsActive ? (
          <>
            <button onClick={changeList}>Get My Past Orders</button>
            <div className="list-container">
              <CustomerProductList />
            </div>
          </>
        ) : (
          <>
            <button onClick={changeList}>Product List</button>
            <div className="list-container">
              <CustomerOrders />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerContainer;
