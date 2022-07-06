/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', (table)=>{
        table.increments('id')
        table.integer('user_id').references('id').inTable('users')
        table.integer('channel_id').references('id').inTable('channels')
        table.text('message');
        table.timestamps(true, true);   
    })
   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
