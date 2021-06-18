const inquirer = require("inquirer");

const deleteEmployee = async (database) => {
  const employees = await database.selectAll("employee");

  const generateChoices = (emps) => {
    return emps.map((emp) => {
      return {
        short: emp.id,
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      };
    });
  };
  const findEmployee = [
    {
      type: "list",
      message: "Choose the employee you would like to delete:",
      name: "id",
      choices: generateChoices(employees),
    },
  ];

  //This will delete the employee where the ID matches the one chosen. Same for Departments and Roles.
  const { id } = await inquirer.prompt(findEmployee);
  await database.deleteOne("employee", "id", id);
};

const deleteRole = async (database) => {
  const allRoles = await database.selectAll("role");

  const generateChoices = (roles) => {
    return roles.map((role) => {
      return {
        short: role.id,
        name: role.title,
        value: role.id,
      };
    });
  };
  const findRole = [
    {
      type: "list",
      message: "Choose the role you would like to delete:",
      name: "id",
      choices: generateChoices(allRoles),
    },
  ];

  const { id } = await inquirer.prompt(findRole);
  await database.deleteOne("role", "id", id);
};

const deleteDepartment = async (database) => {
  const allDepartments = await database.selectAll("department");

  const generateChoices = (departments) => {
    return departments.map((department) => {
      return {
        short: department.id,
        name: department.name,
        value: department.id,
      };
    });
  };
  const findDepartment = [
    {
      type: "list",
      message: "Choose the department you would like to delete:",
      name: "id",
      choices: generateChoices(allDepartments),
    },
  ];

  const { id } = await inquirer.prompt(findDepartment);
  await database.deleteOne("department", "id", id);
};

module.exports = { deleteEmployee, deleteRole, deleteDepartment };
