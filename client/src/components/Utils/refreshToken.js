import axios from 'axios';
import { getBaseURL } from "../apiConfig";

const refreshToken = async (token) => {
    try {
        let url = `${getBaseURL()}api/token/refreshToken`;
        const response = await axios.post(url, { refreshToken: token });
        const newToken = response.data.token; // Assuming your backend returns the new token
        // Update session storage or state with the new access token
        console.log("inside refresh token ")
        sessionStorage.setItem("jwt_token", newToken);
        sessionStorage.setItem("jwt_refresh_token", response.data.refreshToken);
        return response.data.refreshToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error; // Handle error appropriately
    }
};

export default refreshToken;
