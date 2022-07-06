// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    
    connection: {
      database: "mb_auth",
      user: "postgres",
      password: "",
    },
    
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
