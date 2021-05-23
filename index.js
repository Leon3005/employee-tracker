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
          type: "input",
          message: "Enter the role ID of the employee:",
          name: "role_id",
        },
      ];

      const answers = await inquirer.prompt(newEmployeeQ);
      await database.addEmployee(answers);
    }

    if (choice === "EXIT") {
      console.log("App exited.");
      inProgress = false;
      database.end();
    }
  }
};

init();
