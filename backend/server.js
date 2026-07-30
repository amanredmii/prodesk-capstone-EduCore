require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth_routes");
const courseRoutes = require("./routes/course_routes");
const adminCourseRoutes = require("./routes/admin_route");
const studentCourseRoutes = require("./routes/student_route");
const enrollmentRoutes = require("./routes/enroll_routes");

const app = express();

connectDB();

app.use(
    cors({
        origin: [
            "https://educore-frontend-six.vercel.app/"
        ],
        credentials: true
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/admin/courses", adminCourseRoutes);
app.use("/api/student/courses", studentCourseRoutes);
app.use("/api/student/enrollments", enrollmentRoutes);

const { notFound, errorHandler } =
    require("./middleware/errorMiddleware");

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});