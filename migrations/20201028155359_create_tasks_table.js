exports.up = function(knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments();
        table.text('name',1000).notNullable();
        table.boolean('isFinished').defaultTo(false);
        table.timestamps(true,true);
        table.integer('user_id')
             .unsigned()
             .references('id')
             .inTable('users')
             .onDelete('CASCADE')
             .onUpdate('CASCADE')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};
