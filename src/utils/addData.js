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

const addRole = async () => {
  const allDepartments = await database.selectAll("department");

  //Returns all departments as choices.
  const generateChoices = (departments) => {
    return departments.map((department) => {
      return {
        short: department.id,
        name: department.name,
        value: department.id,
      };
    });
  };

  const newRoleQ = [
    {
      type: "input",
      message: "Enter the name of the role:",
      name: "title",
    },
    {
      type: "input",
      message: "Enter the salary of the role: (with 2 decimal points)",
      name: "salary",
    },
    {
      type: "list",
      message: "Choose the department the role belongs to:",
      name: "department_id",
      choices: generateChoices(allDepartments),
    },
  ];

  const answers = await inquirer.prompt(newRoleQ);
  await database.addNew("role", answers);
};

const addDepartment = async () => {
  const newDepartmentQ = [
    {
      type: "input",
      message: "Enter the name of the department:",
      name: "name",
    },
  ];

  const answers = await inquirer.prompt(newDepartmentQ);
  await database.addNew("department", answers);
};

module.exports = { addEmployee, addRole, addDepartment };
