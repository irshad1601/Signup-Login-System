const ensureAuthentication = require("../middleware/auth");


const router = require("express").Router();

router.get("/", ensureAuthentication, (req, res) => {
    console.log("------logged in user details-----", req.user);
    res.status(200).json([
        {
            name: "mobile",
            price:10000
        },
        {
            name: "TV",
            price:50000
        },
        {
            name: "Laptop",
            price:100000
        }
    ])
    
})

module.exports = router;