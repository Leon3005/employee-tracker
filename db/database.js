const mysql = require("mysql");

class Db {
  constructor(database) {
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

  end() {
    this.connection.end();
    console.log(`Disconnected from ${this.database}`);
  }

  allEmployeeData() {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, data) => {
        if (err) reject(err);
        resolve(data);
      };
      this.connection.query(
        `SELECT first_name as "first_name", last_name as "last_name", title as "role", name as "department", salary as "salary" FROM employee RIGHT JOIN role ON employee.role_id=role.id INNER JOIN department on department.id=role.department_id;`,
        handleQuery
      );
      // MANAGER? --  manager_id as "manager" -- employee on employee.manager_id=employee.id
    });
  }

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

  addEmployee(data) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Successfully inserted data");
        console.log(data);
        resolve(rows);
      };

      this.connection.query(`INSERT INTO employee SET ${data};`, handleQuery);
    });
  }
}

module.exports = Db;
