const Db = require("./db/database");

const database = new Db("employees_db");
database.start();
