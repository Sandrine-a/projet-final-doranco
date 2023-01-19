const router = require("express").Router();

const user_ctrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");

// Enregistement des endpoints et redirection des requetes vers les methodes du controller
// router.get("/", user_ctrl.get_users); /// A SUPPRIMER

router.post("/", user_ctrl.create_user); // Pour SIGNUP
router.get("/:id", user_ctrl.get_one_user); // Pour LOGIN
router.delete("/:id", auth, user_ctrl.delete_user); // POUR DELETE
router.put("/:id", auth ,user_ctrl.update_user); //// Voir changement mdp

module.exports = router;
