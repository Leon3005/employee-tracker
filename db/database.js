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

  allData(tableName) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, data) => {
        if (err) reject(err);
        resolve(data);
      };
      this.connection.query(`SELECT * FROM ${tableName}`, handleQuery);
    });
  }
}

module.exports = Db;
