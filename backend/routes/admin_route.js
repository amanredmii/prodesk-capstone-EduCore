const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth_middleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createCourse,
    getMyCourses,
    updateCourse,
    deleteCourse,
} = require("../controllers/ad_course_controller");

router.use(protect);
router.use(authorizeRoles("admin"));

router.route("/")
    .post(createCourse)
    .get(getMyCourses);

router.route("/:id")
    .put(updateCourse)
    .delete(deleteCourse);

module.exports = router;