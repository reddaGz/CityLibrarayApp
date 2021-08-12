const dbConnect = require("../util/database");
const jwt = require("jsonwebtoken");
const key = "@GbFh_fki_xyz";
exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  const checkQuery = `select * from CityLibrary_db.check_user
                   where userName='${userName}' and password='${password}'`;
  const user = await dbConnect.promise().query(checkQuery);
  try {
    if (user[0].length !== 0) {
      const jwtToken = jwt.sign({ userName: userName }, key);
      res.json({ jwtToken: jwtToken });
    } else {
      res.json({ error: "invalid username and password" });
    }
  } catch (err) {
    next(err);
  }
};
exports.authorize = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const jwtToken = token.split(" ")[1];
    try {
      const data = jwt.verify(jwtToken, key);
      req.user = data;
      next();
    } catch (error) {
      res.status(403).json({ error: "Forbidden" });
    }
  } else {
    res.status(401).json({ error: "unauthorize" });
  }
};
exports.save = async (req, res, next) => {
  console.log(req.body)
  const { userId, firstName, lastName, userName, password } = req.body;
  try {
    const insertUser = `CALL CityLibrary_db.insertUser
                     ('${Number(
                       userId
                     )}','${firstName}','${lastName}','${userName}','${password}')`;
    const inserted = await dbConnect.promise().query(insertUser);
    res.status(201).json({ inserted: true });
  } catch (err) {
     next(err);
   }
};
