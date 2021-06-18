// Importing node modules.
const inquirer = require("inquirer");
const chalk = require("chalk");

// Importing the Db class and making a new instance called database.
const Db = require("./src/db/database");
const database = new Db("employees_db");

//Importing add, update, and delete functions
const { addEmployee, addRole, addDepartment } = require("./src/utils/addData");
const { updateManager, updateRole } = require("./src/utils/updateData");
const {
  deleteEmployee,
  deleteRole,
  deleteDepartment,
} = require("./src/utils/deleteData");

//Creating the function to run all of the questions/app.
const init = async () => {
  //Calling the start function to start the database.
  await database.start();

  let inProgress = true;

  while (inProgress) {
    //List of available choices
    const selectOption = {
      type: "list",
      message: "Choose an option from the list below:",
      name: "choice",
      choices: [
        {
          name: chalk.bold.magentaBright("--- View all employees ---"),
          value: "VIEWEMPLOYEES",
        },
        {
          name: chalk.bold.magentaBright("--- View all roles ---"),
          value: "VIEWROLES",
        },
        {
          name: chalk.bold.magentaBright("--- View all departments ---"),
          value: "VIEWDEPARTMENTS",
        },
        {
          name: chalk.bold.greenBright("--- Add a new employee ---"),
          value: "ADDEMPLOYEE",
        },
        {
          name: chalk.bold.greenBright("--- Add a new role ---"),
          value: "ADDROLE",
        },
        {
          name: chalk.bold.greenBright("--- Add a new department ---"),
          value: "ADDDEPARTMENT",
        },
        {
          name: chalk.bold.yellowBright("--- Update employees manager ---"),
          value: "UPDATEMANAGER",
        },
        {
          name: chalk.bold.yellowBright("--- Update employees role ---"),
          value: "UPDATEROLE",
        },
        {
          name: chalk.bold.redBright("--- Delete an employee ---"),
          value: "DELETEEMPLOYEE",
        },
        {
          name: chalk.bold.redBright("--- Delete a role ---"),
          value: "DELETEROLE",
        },
        {
          name: chalk.bold.redBright("--- Delete a department ---"),
          value: "DELETEDEPARTMENT",
        },
        {
          name: chalk.bold.whiteBright("--- Exit app ---"),
          value: "EXIT",
        },
      ],
    };
    //Getting the answer of the above options.
    const { choice } = await inquirer.prompt(selectOption);

    //Using if statements to invoke a function from the database class depending on the user choice.
    if (choice === "VIEWEMPLOYEES") {
      const employees = await database.allEmployeeData();
      console.table(employees);
    }

    if (choice === "VIEWROLES") {
      const rolesDepartments = await database.allRolesDepartments();
      console.table(rolesDepartments);
    }

    if (choice === "VIEWDEPARTMENTS") {
      const allRoles = await database.selectAll("department");
      console.table(allRoles);
    }

    if (choice === "ADDEMPLOYEE") {
      await addEmployee(database);
    }

    if (choice === "ADDROLE") {
      await addRole(database);
    }

    if (choice === "ADDDEPARTMENT") {
      await addDepartment(database);
    }

    if (choice === "UPDATEMANAGER") {
      await updateManager(database);
    }

    if (choice === "UPDATEROLE") {
      await updateRole(database);
    }

    if (choice === "DELETEEMPLOYEE") {
      await deleteEmployee();
    }

    if (choice === "DELETEROLE") {
      await deleteRole();
    }

    if (choice === "DELETEDEPARTMENT") {
      await deleteDepartment();
    }

    if (choice === "EXIT") {
      console.log("App exited.");
      inProgress = false;
      await database.end();
      process.exit(0);
    }
  }
};

init();
