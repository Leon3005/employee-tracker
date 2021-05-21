const inquirer = require("inquirer");

const Db = require("./db/database");
const database = new Db("employees_db");

const init = async () => {
  await database.start();
  const employees = await database.allData("employee");
  console.table(employees);
  database.end();
};

init();
