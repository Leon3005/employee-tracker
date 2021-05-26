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
        `SELECT first_name as "First Name", last_name as "Last Name", title as "Role", name as "Department", salary as "Salary", (SELECT CONCAT(m.first_name, " ", m.last_name) FROM employee AS m WHERE employee.manager_id=m.id) AS "Managers" FROM employee AS employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department on department.id=role.department_id;`,
        handleQuery
      );
    });
  }

  selectAll(tableName) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT * FROM ${tableName};`, handleQuery);
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
        console.log("Employee has been added!");
        resolve(rows);
      };

      this.connection.query(`INSERT INTO employee SET ? ;`, data, handleQuery);
    });
  }

  addRole(data) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Role has been added!");
        resolve(rows);
      };

      this.connection.query(`INSERT INTO role SET ? ;`, data, handleQuery);
    });
  }

  addDepartment(data) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Department has been added!");
        resolve(rows);
      };

      this.connection.query(
        `INSERT INTO department SET ? ;`,
        data,
        handleQuery
      );
    });
  }

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

  deleteOne(tableName, columnName, value) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        console.log("Role deleted!");
        resolve(rows);
      };

      const query = this.connection.query(
        `DELETE FROM ${tableName} WHERE ??=?`,
        [columnName, value],
        handleQuery
      );
    });
  }
}

module.exports = Db;
