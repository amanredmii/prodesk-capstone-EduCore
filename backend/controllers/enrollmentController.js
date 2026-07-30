const Enrollment = require("../models/enrollment");

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const exists = await Enrollment.findOne({
            user: req.user._id,
            course: courseId
        });

        if (exists) {
            return res.status(400).json({
                message: "Already enrolled"
            });
        }

        const enrollment = await Enrollment.create({
            user: req.user._id,
            course: courseId
        });

        res.status(201).json(enrollment);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getMyCourses = async (req, res) => {
    try {

        const courses = await Enrollment.find({
            user: req.user._id
        }).populate("course");

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProgress = async (req, res) => {
    try {

        const { progress } = req.body;

        const enrollment = await Enrollment.findOne({
            user: req.user._id,
            course: req.params.courseId
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        enrollment.progress = progress;
        enrollment.completed = progress >= 100;

        await enrollment.save();

        res.status(200).json(enrollment);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const removeEnrollment = async (req, res) => {
    try {

        await Enrollment.findOneAndDelete({
            user: req.user._id,
            course: req.params.courseId
        });

        res.status(200).json({
            message: "Course removed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    enrollCourse,
    getMyCourses,
    updateProgress,
    removeEnrollment
};