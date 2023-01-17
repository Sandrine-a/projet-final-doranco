const router = require("express").Router();

const task_ctrl = require("../controllers/task.controller");

// Enregistement des endpoints et redirection des requetes vers les methodes du controller
router.get("/", task_ctrl.get_tasks);
router.post("/", task_ctrl.create_task);
router.get("/:id", task_ctrl.get_one_task);
router.put("/:id", task_ctrl.update_task);
router.delete("/:id", task_ctrl.delete_task);

module.exports = router;
