// AdminContainer.js

import React, { useState } from "react";
import AdminProductDetails from "../AdminProductDetails/AdminProductDetails";
import ProductList from "../ProductList/AdminProductList";
import AdminOrderList from "../Orders/AdminOrderList";
import OrderDetails from "../Orders/OrderDetails";
import "./AdminContainer.scss";

const AdminContainer = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductList, setShowProductList] = useState(true);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };
  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  const onBackClickToProductList = () => {
    setSelectedProduct(null);
    setSelectedOrder(null);
    setShowProductList(true)
  }
  const onBackClickToOrderDetails = () => {
    setSelectedProduct(null);
    setSelectedOrder(null);
    setShowProductList(false)
  }

  return (
    <div className="admin-container">
      {selectedProduct ? (
        <div className="details-container">
          <AdminProductDetails productId={selectedProduct.productId} onBackClick={onBackClickToProductList} />
        </div>
      ) : (
        <>
          <div>
            {showProductList ? (
              <div className="product-list-container">
                <button onClick={() => setShowProductList(false)}>
                  Get Order List
                </button>
                <ProductList handleProductDetails={handleProductDetails} />
              </div>
            ) : (
              <div className="order-list-container">
                {selectedOrder ? (
                  <div className="details-container">
                    <OrderDetails orderId={selectedOrder.orderId} onBackClick={onBackClickToOrderDetails} />
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setShowProductList(true)}>
                      Get Product List
                    </button>
                    <AdminOrderList handleOrderDetails={handleOrderDetails} />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContainer;
