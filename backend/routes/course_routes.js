const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth_middleware");

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require("../controllers/course_controller");


router.post("/", protect, createCourse);


router.get("/", protect, getCourses);


router.get("/:id", protect, getCourseById);


router.put("/:id", protect, updateCourse);


router.delete("/:id", protect, deleteCourse);

module.exports = router;