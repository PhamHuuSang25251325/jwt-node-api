
exports.up = function (knex) {
    return knex.schema.alterTable('users', function (t) {
        t.text('name', 'nvarchar').notNullable().alter();
        t.string('email').alter();
    });
};

exports.down = function (knex) {

};
