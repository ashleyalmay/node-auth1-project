// Update with your config settings.
require("dotenv").config();

const localPg = "postgresql://postgres@localhost/auth";
const pgConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  }};
