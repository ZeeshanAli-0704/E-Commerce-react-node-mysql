import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import ShoppingCart from "../ShopingCart/ShoppingCart";

const ProductListCustomer = (props) => {
  const [productList, setProductList] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const customerId = sessionStorage.getItem("customerId");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/products`)
      .then((res) => {
        res.data.forEach((product) => {
          product.quantity = 0;
        });
        axios
          .get(`${getBaseURL()}api/cart/${customerId}`)
          .then((responseCart) => {
            let productsInCart = responseCart.data;
            setCartProducts(productsInCart);
            setProductList(res.data);
          })
          .catch((err) => console.log("Error occurred"));
      })
      .catch((err) => console.log("Error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (product) => {
    if (product.quantity > 0) {
      let updatedCartList = [...cartProducts]; // Copy existing cart products
      let existingProductIndex = updatedCartList.findIndex(
        (p) => p.productId === product.productId
      );

      if (existingProductIndex !== -1) {
        // Product already exists in cart, update its quantity
        updatedCartList[existingProductIndex].quantity =
          updatedCartList[existingProductIndex].quantity + product.quantity;
      } else {
        // Product not found in cart, add it
        updatedCartList.push({ ...product });
      }

      axios
        .post(`${getBaseURL()}api/cart/add`, {
          customerId,
          productId: product.productId,
          quantity: product.quantity,
          isPresent: existingProductIndex !== -1,
        })
        .then((res) => {
          setCartProducts(updatedCartList);
          const updatedProductList = productList.map((p) => ({
            ...p,
            quantity: 0,
          }));
          setProductList(updatedProductList);
        })
        .catch((error) => console.log("Error adding to cart:", error));
    }
  };

  const removeProduct = (productId) => {
    axios
      .delete(`${getBaseURL()}api/cart/remove/${productId}/${customerId}`)
      .then((res) => {
        console.log("Deleted successfully");
        let updatedCartList = cartProducts.filter((product) => {
          return product.productId !== productId;
        });
        setCartProducts(updatedCartList);
      })
      .catch((err) => {
        console.log("Error occurred");
      });
  };

  const updateProductQuantity = (e, productId) => {
    const updatedList = productList.map((product) => {
      if (product.productId === productId) {
        product.quantity = parseInt(e.target.value);
      }
      return product;
    });
    setProductList(updatedList);
  };
  const buyProducts = () => {
    // Retrieve JWT token from session storage
    const token = sessionStorage.getItem('jwt_token');

    if (!token) {
      // Handle case where token is not available
      alert("Authorization token is missing");
      return;
    }

    if (address !== "") {
      let customerPayload = { address };

      // Include JWT token in the headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios
        .post(`${getBaseURL()}api/cart/buy/${customerId}`, { ...customerPayload }, config)
        .then((res) => {
          setCartProducts([]);
          setAddress("");
          alert("Order placed successfully");
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            // Unauthorized - token might be expired or invalid
            alert("Authorization failed. Please log in again.");
            // Handle logout or redirect to login page
          } else {
            // Other error handling
            console.error("Error:", error);
          }
        });
    } else {
      alert("Please enter your address");
    }
  };


  const updateAddress = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  return (
    <>
      <div className="product-list-container">
        <div>
          <h1>Products</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>No. of Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => {
              return (
                <>
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        type="number"
                        value={product.quantity}
                        min="0"
                        placeholder="Quantity"
                        onChange={(e) =>
                          updateProductQuantity(e, product.productId)
                        }
                      ></input>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <ShoppingCart
        cartProducts={cartProducts}
        removeProduct={removeProduct}
        buyProducts={buyProducts}
        address={props.address}
        updateAddress={updateAddress}
      />
    </>
  );
};

export default ProductListCustomer;
