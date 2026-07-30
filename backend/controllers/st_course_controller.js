const Course = require("../models/course");

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find().populate(
            "authorId",
            "name"
        );

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getCourseById = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id).populate(
            "authorId",
            "name"
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.searchCourses = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";

        const courses = await Course.find({
            title: {
                $regex: keyword,
                $options: "i"
            }
        }).populate("authorId", "name");

        res.status(200).json(courses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};