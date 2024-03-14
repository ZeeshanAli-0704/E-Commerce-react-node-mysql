const {refreshToken} = require("../utils/token");

// User Token Refresh Token
exports.getRefreshToken = (req, res) => {
    const refreshTokenInput = req.body.refreshToken;
     refreshToken(refreshTokenInput).then((response)=>{
         res.send(response);
     }).catch(()=>{
         res.status(500).send("Error Fetching Token");
     });
};




