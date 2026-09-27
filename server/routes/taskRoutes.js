const express = require("express");
const mongoose = require("mongoose");

const Task = require("../models/Task");

const router = express.Router();


// =====================================================
// GET ALL TASKS FOR LOGGED-IN USER
// GET /api/tasks
// =====================================================

router.get("/", async (req, res) => {

    try {

        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }

        const tasks = await Task.find({
            userId: userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json(tasks);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
});


// =====================================================
// ADD TASK
// POST /api/tasks
// =====================================================

router.post("/", async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            userId
        } = req.body;


        if (!title || !userId) {

            return res.status(400).json({
                message: "Title and user ID are required"
            });
        }


        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                message: "Invalid User ID"
            });
        }


        const task = new Task({

            title: title.trim(),

            description:
                description || "",

            priority:
                priority || "Medium",

            completed: false,

            userId: userId

        });


        const savedTask =
            await task.save();


        res.status(201).json({

            message: "Task created successfully",

            task: savedTask

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to create task"

        });
    }
});


// =====================================================
// UPDATE TASK
// PUT /api/tasks/:id
// =====================================================

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            priority,
            completed
        } = req.body;


        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                message: "Invalid task ID"

            });
        }


        const updateData = {};


        if (title !== undefined) {
            updateData.title = title;
        }


        if (description !== undefined) {
            updateData.description =
                description;
        }


        if (priority !== undefined) {
            updateData.priority =
                priority;
        }


        if (completed !== undefined) {
            updateData.completed =
                completed;
        }


        const task =
            await Task.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });
        }


        res.status(200).json({

            message:
                "Task updated successfully",

            task

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Failed to update task"

        });
    }
});


// =====================================================
// DELETE TASK
// DELETE /api/tasks/:id
// =====================================================

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                message: "Invalid task ID"

            });
        }


        const task =
            await Task.findByIdAndDelete(id);


        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });
        }


        res.status(200).json({

            message:
                "Task deleted successfully"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Failed to delete task"

        });
    }
});


module.exports = router;