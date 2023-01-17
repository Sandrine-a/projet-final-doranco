const router = require("express").Router();

const user_ctrl = require("../controllers/user.controller");

// Enregistement des endpoints et redirection des requetes vers les methodes du controller
// router.get("/", user_ctrl.get_user);
router.post("/", user_ctrl.create_user);
router.put("/:id", user_ctrl.update_user);
router.delete("/:id", user_ctrl.delete_user);

module.exports = router;
