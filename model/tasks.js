import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "Description not given",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const TaskModel = (mongoose.models.Task || mongoose.model("Task", TaskSchema ))

export default TaskModel;