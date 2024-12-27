import session from "express-session";
import MysqlStore from "express-mysql-session";
import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

const MysqlStoreInstance = MysqlStore(session);

const dbConfig = {
  host: process.env["DB_HOST"],
  user: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
};

const pool = mysql.createPool(dbConfig);

const sessionStore = new MysqlStoreInstance({}, pool);

export function configDbSession(app) {
  app.use(
    session({
      secret: "banana",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
}

sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    // Something went wrong.
    console.error(error);
  });
