const router = require("express").Router();
const controller = require("../controllers/User");

router.get("/user", controller.userlistControl);

router.post("/userRegister", controller.userRegisterControl);

router.post("/userLogIn", controller.userLogInControl);

router.post("/userLogOut", controller.userLogOutControl);

router.patch("/userEdit", controller.userEditControl);

router.delete("/userDelete", controller.userDeleteControl);

module.exports = router;
