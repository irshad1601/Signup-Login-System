const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log("auth value: ",auth);
    
    if(!auth){
        return res.status(403)
        .json({
            message: "Unauthorized, JWT token is require"
        })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
        .json({
            message: "Unauthorized, JWT token wrong or expired"
        })
    }
}

module.exports = ensureAuthentication;