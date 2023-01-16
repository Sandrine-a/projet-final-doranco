const router = require("express").Router();

const task_ctrl = require("../controller/task.controller");

// Enregistement des endpoints et redirection des requetes vers les methodes du controller
// router.get("/", task_ctrl.get_tasks);
router.post("/", task_ctrl.create_task);
// router.put("/:id", employe_ctrl.update_employe);
// router.delete("/:id", employe_ctrl.delete_employe);

module.exports = router;
