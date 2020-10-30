const knex = require('../dbConfig');

const getById =async id =>{
    return await knex('users').where('id',id).first();
}

const add =async user=>{
    const [result] = await knex('users').insert(user).returning(['id','name','email']);
    return result;

}

module.exports = {
    add
}