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
    const startConnection = (err) => {
      if (err) {
        throw err;
      }
      console.log(`Connection to ${this.database} established.`);
    };
    this.connection.connect(startConnection);
  }
}

module.exports = Db;
