const express = require("express");

const router = express.Router();

const {
    enrollCourse,
    getMyCourses,
    updateProgress,
    removeEnrollment
} = require("../controllers/enrollmentController");

const protect = require("../middleware/auth_middleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("student"));

router.post("/", enrollCourse);

router.get("/", getMyCourses);

router.put("/:courseId/progress", updateProgress);

router.delete("/:courseId", removeEnrollment);

module.exports = router;