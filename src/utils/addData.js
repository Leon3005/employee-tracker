const inquirer = require("inquirer");

const Db = require("../db/database");
const database = new Db("employees_db");

const addEmployee = async () => {
  const allRoles = await database.selectAll("role");

  //The below generateChoices is used to show all roles available in the database.
  const generateChoices = (roles) => {
    return roles.map((role) => {
      return {
        short: role.id,
        name: role.title,
        value: role.id,
      };
    });
  };

  const newEmployeeQ = [
    {
      type: "input",
      message: "Enter the first name of the employee:",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the employee:",
      name: "last_name",
    },
    {
      type: "list",
      message: "Choose the employee's role:",
      name: "role_id",
      choices: generateChoices(allRoles),
    },
  ];

  const answers = await inquirer.prompt(newEmployeeQ);
  //This will add a new employee and their role id.
  await database.addNew("employee", answers);
};

module.exports = { addEmployee };
