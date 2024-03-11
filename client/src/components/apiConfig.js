
// apiConfig.js
export const getBaseURL = () => {
    return process.env.REACT_APP_API_URL || "http://localhost:3001/";
};
