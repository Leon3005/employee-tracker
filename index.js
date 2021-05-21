const Db = require("./db/database");

const init = async () => {
  const database = new Db("employees_db");
  await database.start();
  const employees = await database.allData("employee");
  console.table(employees);
};

init();
