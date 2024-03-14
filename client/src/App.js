import "./App.scss";
import { useState } from "react";
import LoginRegisterForm from "./components/LoginRegisterContainer/LoginRegisterContainer"
import AdminCustomerContainer from "./components/AdminCustomerContainer/AdminCustomerContainer";

function App() {
  let [isUserAuthenticated, setUserAuthorization] = useState(
    sessionStorage.getItem("isUserAuthenticated") === "true" || false
  );
  let [isAdmin, setAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true" || false
  );
  let [customerId, setCustomerId] = useState(
    sessionStorage.getItem("customerId") || undefined
  );

  const setUserAuthenticatedStatus = (isAdmin, customerId) => {
    setUserAuthorization(true);
    setAdmin(isAdmin);
    setCustomerId(customerId);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("isUserAuthenticated");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("jwt_refresh_token");
    setUserAuthorization(false);
    setAdmin(false);
    setCustomerId(undefined);
  };
  return (
    <div >
      {!isUserAuthenticated ? (
        <LoginRegisterForm setUserAuthenticatedStatus={setUserAuthenticatedStatus} />
      ) : (
        <>
            <div className="login-button-container"><button
              onClick={handleLogout}
              // style={{
              //   backgroundColor: 'black',
              //   color: 'white',
              //   border: 'none',
              //   padding: '10px 20px',
              //   borderRadius: '5px',
              //   cursor: 'pointer'
              // }}
              className="login-button"
            >
              Logout
            </button></div>

          <AdminCustomerContainer isAdmin={isAdmin} customerId={customerId} />
        </>

      )}
    </div>
  );
}

export default App;
