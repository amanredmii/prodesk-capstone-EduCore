require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("./models/course");

const courses = [
    {
        title: "React Basics",
        description: "Learn React from beginner to advanced.",
        price: 999,
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        category: "Frontend",
        isDefault: true
    },
    {
        title: "JavaScript Mastery",
        description: "Master modern JavaScript.",
        price: 799,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        category: "Programming",
        isDefault: true
    },
    {
        title: "Node.js Complete Guide",
        description: "Build scalable backend applications.",
        price: 1299,
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        category: "Backend",
        isDefault: true
    },
    {
        title: "Express.js API Development",
        description: "Build REST APIs using Express.",
        price: 899,
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        category: "Backend",
        isDefault: true
    },
    {
        title: "MongoDB Essentials",
        description: "Learn MongoDB and Mongoose.",
        price: 999,
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
        category: "Database",
        isDefault: true
    },
    {
        title: "Python for Beginners",
        description: "Start programming with Python.",
        price: 699,
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
        category: "Programming",
        isDefault: true
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Course.deleteMany({ isDefault: true });

        await Course.insertMany(courses);

        console.log("Default courses added");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seed();