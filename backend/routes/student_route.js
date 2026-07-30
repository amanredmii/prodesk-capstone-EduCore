const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth_middleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getAllCourses,
    getCourseById,
    searchCourses,
} = require("../controllers/st_course_controller");

router.use(protect);
router.use(authorizeRoles("student"));

router.get("/search", searchCourses);

router.get("/", getAllCourses);

router.get("/:id", getCourseById);

module.exports = router;