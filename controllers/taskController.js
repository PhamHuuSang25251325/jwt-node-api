
require('dotenv').config()
const knex = require('../dbConfig');
const Task = require('../models/task');

const addTaks = async (req, res) => {
    const { name } = req.body;
    const user_id = req.user.id;

    try {
        const task = await Task.add({ name, user_id });
        return res.status(200).json({
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })
    }
}

const updateTaks = async (req, res) => {
    const { name, isFinished } = req.body;
    const { id } = req.params;
    try {
        const task = await Task.update(id, { name, isFinished });
        return res.status(200).json({
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.remove(id);
        return res.status(200).json({
            task
        })
    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })
    }
}

const getTasks = async (req, res) => {
    const { search } = req.query;
    const user_id = req.user.id;
    try {
        const tasks = await Task.getTasks(user_id,search);
        return res.status(200).json({
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })
    }


}






module.exports = {
    addTaks,
    updateTaks,
    deleteTask,
    getTasks
}