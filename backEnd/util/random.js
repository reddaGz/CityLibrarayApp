const dbConnect = require("./database");
exports.generateRandomNum = async () => {
  let randomNum = Math.floor(1000000000 + Math.random() * 900000);
  let n = "b-" + randomNum;
  const idQuery = `select * from CityLibrary_db.book_id
                            where bookId='${n}'`;
  let uniqNum = await dbConnect.promise().query(idQuery);
  let len = uniqNum[0].length;
  while (len !== 0) {
    randomNum = Math.floor(1000000000 + Math.random() * 900000);
    n = "b-" + randomNum;
    uniqNum = await dbConnect.promise().query(idQuery);
    len = uniqNum[0].length;
  }
  return randomNum;
};
