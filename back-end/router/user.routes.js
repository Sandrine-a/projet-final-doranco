const router = require("express").Router();

const user_ctrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");

// Enregistement des endpoints et redirection des requetes vers les methodes du controller
router.get("/", user_ctrl.get_users); /// A SUPPRIMER

router.post("/", user_ctrl.create_user); // Pour SIGNUP
router.get("/:id", user_ctrl.get_one_user); // Pour LOGIN
router.delete("/:id", user_ctrl.delete_user); 
router.put("/:id", auth ,user_ctrl.update_user); 

// router.get("/:id/tasks", user_ctrl.get_user_tasks);

module.exports = router;
