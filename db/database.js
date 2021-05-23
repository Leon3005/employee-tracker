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
      this.connection.query(`SELECT * FROM employee`, handleQuery);
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
}

module.exports = Db;
