const inquirer = require("inquirer");

const updateManager = async (database) => {
  //Makes all employees available to be chosen.
  const employees = await database.selectAll("employee");

  const generateChoicesEmployee = (emps) => {
    return emps.map((emp) => {
      return {
        short: emp.id,
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      };
    });
  };
  const updateManagerQ = [
    {
      type: "list",
      message: "Choose the employee you would like to update:",
      name: "id",
      choices: generateChoicesEmployee(employees),
    },
    {
      type: "list",
      message: "Choose the manager you would like to add:",
      name: "manager_id",
      choices: generateChoicesEmployee(employees),
    },
  ];

  const { manager_id, id } = await inquirer.prompt(updateManagerQ);
  //Updates the employees manager ID
  await database.updateOne("employee", { manager_id }, "id", id);
};

const updateRole = async (database) => {
  const employees = await database.selectAll("employee");
  const allRoles = await database.selectAll("role");

  const generateChoicesEmployee = (emps) => {
    return emps.map((emp) => {
      return {
        short: emp.id,
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      };
    });
  };
  const generateChoicesRole = (roles) => {
    return roles.map((role) => {
      return {
        short: role.id,
        name: role.title,
        value: role.id,
      };
    });
  };
  const updateRoleQ = [
    {
      type: "list",
      message: "Choose the employee you would like to update:",
      name: "id",
      choices: generateChoicesEmployee(employees),
    },
    {
      type: "list",
      message: "Choose the role you would like to change to:",
      name: "role_id",
      choices: generateChoicesRole(allRoles),
    },
  ];

  //Updates the employees role ID
  const { role_id, id } = await inquirer.prompt(updateRoleQ);
  await database.updateOne("employee", { role_id }, "id", id);
};

module.exports = { updateManager, updateRole };
