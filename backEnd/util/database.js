const mysql2 = require("mysql2");
module.exports = mysql2.createConnection({
  host: "localhost",
  user: "Rbf",
  password: "Rbf@12345",
  database: "CityLibrary_db",
});
