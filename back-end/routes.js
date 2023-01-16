const router = require("express").Router();

router.use("/task", require("./router/task.routes"));

module.exports = router;