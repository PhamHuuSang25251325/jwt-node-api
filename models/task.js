const knex = require('../dbConfig');

const getTasks = async (user_id, keyword) => {
    let query = knex('tasks').where('user_id', '=', user_id);
    if (keyword) query = query.where('name', 'like', `%${keyword}%`);
    return await query;
}

const add = async task => {
    const [result] = await knex('tasks').insert(task).returning(['id', 'name', 'user_id', 'isFinished']);
    return result;

}

const update = async (id, task) => {
    const [result] = await knex('tasks').where('id', '=', id)
        .update(task)
        .returning(['id', 'name', 'user_id', 'isFinished']);

    return result;
}

const remove = async id => {
    const [result] = await knex('tasks').where('id', '=', id).del()
        .returning(['id', 'name', 'user_id', 'isFinished']);
    return result;

}

module.exports = {
    add,
    update,
    remove,
    getTasks
}