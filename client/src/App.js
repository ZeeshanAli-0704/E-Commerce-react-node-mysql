import "./App.scss";
import { useState } from "react";
import LoginRegisterForm from "./components/LoginRegisterContainer/LoginRegisterContainer"
import AdminCustomerContainer from "./components/AdminCustomerContainer/AdminCustomerContainer";

function App() {
  let [isUserAuthenticated, setUserAuthorizarion] = useState(
    sessionStorage.getItem("isUserAuthenticated") === "true" || false
  );
  let [isAdmin, setAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true" || false
  );
  let [customerId, setCustomerId] = useState(
    sessionStorage.getItem("customerId") || undefined
  ); 

  const setUserAuthenticatedStatus = (isAdmin, customerId) => {
    setUserAuthorizarion(true);
    setAdmin(isAdmin);
    setCustomerId(customerId);
  };
  return (
    <div >
      {!isUserAuthenticated ? (
        <LoginRegisterForm setUserAuthenticatedStatus={setUserAuthenticatedStatus} />
      ) : (
        <AdminCustomerContainer isAdmin={isAdmin} customerId={customerId}/>
      )}
    </div>
  );
}

export default App;
