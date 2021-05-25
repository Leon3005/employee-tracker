const inquirer = require("inquirer");

const Db = require("./db/database");
const database = new Db("employees_db");

const init = async () => {
  await database.start();

  let inProgress = true;

  while (inProgress) {
    const selectOption = {
      type: "list",
      message: "Choose an option from the list below:",
      name: "choice",
      choices: [
        {
          name: "--- View all employees ---",
          value: "VIEWEMPLOYEES",
        },
        {
          name: "--- View all roles and departments ---",
          value: "VIEWROLEDEPARTMENT",
        },
        {
          name: "--- Add a new employee ---",
          value: "ADDEMPLOYEE",
        },
        {
          name: "--- Add a new role ---",
          value: "ADDROLE",
        },
        {
          name: "--- Delete an employee ---",
          value: "DELETEEMPLOYEE",
        },
        {
          name: "--- Exit app ---",
          value: "EXIT",
        },
      ],
    };
    const { choice } = await inquirer.prompt(selectOption);

    if (choice === "VIEWEMPLOYEES") {
      const employees = await database.allEmployeeData();
      console.table(employees);
    }

    if (choice === "VIEWROLEDEPARTMENT") {
      const rolesDepartments = await database.allRolesDepartments();
      console.table(rolesDepartments);
    }

    if (choice === "ADDEMPLOYEE") {
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
      await database.addEmployee(answers);
    }

    if (choice === "ADDROLE") {
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
      await database.addRole(answers);
    }

    if (choice === "DELETEEMPLOYEE") {
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

      const { id } = await inquirer.prompt(findEmployee);
      await database.deleteEmployee("employee", "id", id);
    }

    if (choice === "EXIT") {
      console.log("App exited.");
      inProgress = false;
      database.end();
    }
  }
};

init();
