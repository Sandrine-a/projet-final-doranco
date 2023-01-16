const router = require("express").Router();

router.use("/tasks", require("./router/task.routes"));

module.exports = router;