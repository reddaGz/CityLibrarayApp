const dbConnect = require("../util/database");
const random = require("../util/random");
exports.getAllBook = async (req, res, next) => {
  const bookQuery = ` SELECT * FROM CityLibrary_db.view_all_book`;
  try {
    const books = await dbConnect.promise().query(bookQuery);
    res.status(200).json(books[0]);
  } catch (err) {
    next(err);
  }
};
exports.getBookById = async (req, res, next) => {
  //console.log(req.params.id);
  const bookQuery = ` SELECT * FROM CityLibrary_db.view_all_book 
                        where bookId='${req.params.id}'`;
  try {
    const book = await dbConnect.promise().query(bookQuery);
    console.log(book[0]);
    res.status(200).json(book[0][0]);
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  const { ISBN, bookTitle, overDueFee, publishedDate, authorName } = req.body;
  //console.log(ISBN, bookTitle, overDueFee, publishedDate, authorName);
  const uniqNum = await random.generateRandomNum();
  const bookId = "b-" + uniqNum;
  const authorId = "a-" + uniqNum;
  const insertBook = `CALL CityLibrary_db.insertBook ( '${authorId}','${bookId}','${ISBN}','${bookTitle}','${overDueFee}','${authorName}','${publishedDate}')`;
  try {
    await dbConnect.promise().query(insertBook);
    res.status(200).json({ inserted: true });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  //console.log(req.params.id);
  const { ISBN, bookTitle, overDueFee, publishedDate, authorName } = req.body;
  const bookId = req.params.id;
  const authorId = "a-" + bookId.split("-")[1];
  const updateBook = `CALL CityLibrary_db.updateBook ('${authorId}','${bookId}','${ISBN}','${bookTitle}','${overDueFee}','${authorName}','${publishedDate}');`;
  try {
    await dbConnect.promise().query(updateBook);
    res.status(200).json({ updated: true });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const bookId = req.params.id;
  const authorId = "a-" + bookId.split("-")[1];
  console.log(authorId);
  const deleteBook = `CALL CityLibrary_db.deleteBook('${authorId}','${bookId}');`;
  try {
    await dbConnect.promise().query(deleteBook);
    res.status(200).json({ deleted: true });
  } catch (err) {
    next(err);
  }
};
