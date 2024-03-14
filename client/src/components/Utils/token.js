import { jwtDecode } from "jwt-decode";
import refreshToken from "./refreshToken";

const TokenRefresher = (token) => {
    const refreshThreshold = 1 * 60 * 1000; // 1 minute in milliseconds
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    const refreshFunction = () => {
        refreshToken(token)
            .then(newToken => {
                // Call TokenRefresher recursively with the new token
                TokenRefresher(newToken);
            })
            .catch(error => {
                console.error('Error refreshing token:', error);
                // Handle error appropriately
            });
    };

    const interval = setInterval(() => {
        const remainingTime = expirationTime - Date.now();
        if (remainingTime <= refreshThreshold) {
            clearInterval(interval);
            refreshFunction();
        }
    }, 4000); // Check every second

    return () => clearInterval(interval);
};

export default TokenRefresher;
