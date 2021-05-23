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

    if (choice === "EXIT") {
      console.log("App exited.");
      inProgress = false;
      database.end();
    }
  }
};

init();
