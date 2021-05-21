const Db = require("./db/database");

const init = async () => {
  const database = new Db("employees_db");
  await database.start();
};

init();
