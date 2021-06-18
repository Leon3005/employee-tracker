const mysql = require("mysql");

class Db {
  constructor(database) {
    //Defining the settings for the database that will be used with the connection underneath.
    const dbSettings = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database,
    };

    (this.database = database),
      (this.connection = mysql.createConnection(dbSettings));
  }

  //The start function that will start the connection to the database.
  start() {
    return new Promise((resolve, reject) => {
      const startConnection = (err) => {
        if (err) {
          reject(err);
        }
        console.log(`Connection to ${this.database} established.`);
        resolve();
      };
      this.connection.connect(startConnection);
    });
  }

  //The end function that will stop the connection when 'Exit' is selected in the app.
  end() {
    this.connection.end();
    console.log(`Disconnected from ${this.database}`);
  }

  //This function uses LEFT JOINS to show the role and departments for employees depending on the role_id
  allEmployeeData() {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, data) => {
        if (err) reject(err);
        resolve(data);
      };
      this.connection.query(
        `SELECT first_name as "First Name", last_name as "Last Name", title as "Role", name as "Department", salary as "Salary", (SELECT CONCAT(m.first_name, " ", m.last_name) FROM employee AS m WHERE employee.manager_id=m.id) AS "Managers" FROM employee AS employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department on department.id=role.department_id;`,
        handleQuery
      );
    });
  }

  //selectAll accepts a template literal to find all data from a given table.
  selectAll(tableName) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT * FROM ${tableName};`, handleQuery);
    });
  }

  //This function uses RIGHT JOIN to display all roles and departments.
  allRolesDepartments() {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, data) => {
        if (err) reject(err);
        resolve(data);
      };
      this.connection.query(
        `SELECT title as "role", name as "department", salary as "salary" FROM department RIGHT JOIN role ON department.id=role.department_id;`,
        handleQuery
      );
    });
  }

  //Uses a parameterised query to add a new entry depending on user input. (applied to employee, role, and department)
  addNew(tableName, data) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Data has been added!");
        resolve(rows);
      };

      this.connection.query(
        `INSERT INTO ${tableName} SET ? ;`,
        data,
        handleQuery
      );
    });
  }

  //Uses parameterised queries to update data such as employee manager and role.
  updateOne(tableName, data, columnName, value) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully updated data!");
        resolve(rows);
      };

      this.connection.query(
        `UPDATE ${tableName} SET ? WHERE ??="?";`,
        [data, columnName, value],
        handleQuery
      );
    });
  }

  //Uses parameterised queries to delete from tables such as employee, role, and department.
  deleteOne(tableName, columnName, value) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Data deleted!");
        resolve(rows);
      };

      this.connection.query(
        `DELETE FROM ${tableName} WHERE ??=?`,
        [columnName, value],
        handleQuery
      );
    });
  }
}

module.exports = Db;
