const Course = require("../models/course");


exports.createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail } = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            thumbnail,
            authorId: req.user.id,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate(
            "authorId",
            "name email"
        );

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "authorId",
            "name email"
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        if (course.authorId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden: You do not own this course.",
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        if (course.authorId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden: You do not own this course.",
            });
        }

        await course.deleteOne();

        res.status(200).json({
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};