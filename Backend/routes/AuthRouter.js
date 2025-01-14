const { signup, login } = require("../controllers/AuthController");
const { signupvalidation, loginvalidation } = require("../middleware/AuthValidation");

const router = require("express").Router();

router.post("/signup", signupvalidation, signup)

router.post("/login",loginvalidation, login)


module.exports = router;