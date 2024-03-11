import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersByProductId from "../Orders/OrdersByProductId";
import { getBaseURL } from "../apiConfig"; // Import the getBaseURL function
import "./AdminProductDetails.scss";

const ProductDetails = (props) => {
  // const [id, setId] = useState(props.productId);
  const [productDetails, setProductDetails] = useState(true);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/products/${props.productId}`) // Use the common base URL
      .then((res) => {
        let data = res.data;
        setProductName(data[0].name);
        setProductPrice(data[0].price);
        setProductDesc(data[0].description);
        setProductDetails(true);
      })
      .catch((err) => {
        console.log("Sorry couldn't fetch details");
        setProductDetails(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProduct = () => {
    const productData = {
      id: props.productId,
      name: productName,
      price: productPrice,
      description: productDesc,
    };
    axios
      .post(`${getBaseURL()}api/products/update`, { ...productData }) // Use the common base URL
      .then((res) => {
        console.log("Successful");
      });
  };

  const handleBackClickToProductList = () => {
    props.onBackClick();
  };

  return (
    <div className="product-details-container">
      <div className="top-right">
        <button onClick={handleBackClickToProductList}>Back</button>
      </div>
      {productDetails ? (
        <>
          <input
            type="text"
            value={props.productId}
            disabled
            placeholder="Product Id"
          ></input>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            placeholder="Product Name"
          ></input>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            placeholder="Price"
          ></input>
          <input
            type="text"
            value={productDesc}
            onChange={(e) => {
              setProductDesc(e.target.value);
            }}
            placeholder="Description"
          ></input>
          <button onClick={(e) => saveProduct()}>Save</button>
        </>
      ) : null}

      <OrdersByProductId productId={props.productId} />
    </div>
  );
};

export default ProductDetails;
