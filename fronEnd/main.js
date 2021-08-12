/**
 * display login page
 */
function loginDisplay() {
  document.getElementById("navigation_page").style.display = "none";
  document.getElementById("login_form_id").style.display = "block";
  document.getElementById("add_book_class").style.display = "none";
  document.getElementById("signup_class").style.display = "none";
  document.getElementById("view_book_class").style.display = "none";
}
/**
 * log out function
 */
function logOut(){
    document.getElementById("navigation_page").style.display = "none";
    document.getElementById("login_form_id").style.display = "block";
    document.getElementById("add_book_class").style.display = "none";
    document.getElementById("signup_class").style.display = "none";
    document.getElementById("view_book_class").style.display = "none";
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    location.reload()  
}
/**
 * Display create account form
 * @param {Object} event
 */
function createAccountForm(event) {
  event.preventDefault();
  document.getElementById("navigation_page").style.display = "none";
  document.getElementById("login_form_id").style.display = "none";
  document.getElementById("add_book_class").style.display = "none";
  document.getElementById("signup_class").style.display = "block";
  document.getElementById("view_book_class").style.display = "none";
}
/**
 * Display main page
 */
function displayMainPage() {
  document.getElementById("navigation_page").style.display = "block";
  document.getElementById("login_form_id").style.display = "none";
  document.getElementById("add_book_class").style.display = "none";
  document.getElementById("signup_class").style.display = "none";
  document.getElementById("view_book_class").style.display = "none";
  document.getElementById("background_id").style.display="block"
}
/**
 * Display book for to add or update
 */
function displayBookForm() {
  document.getElementById("navigation_page").style.display = "block";
  document.getElementById("login_form_id").style.display = "none";
  document.getElementById("add_book_class").style.display = "block";
  document.getElementById("signup_class").style.display = "none";
  document.getElementById("view_book_class").style.display = "none";
}
/**
 * Display table format to see books
 */
function viewBook() {
  document.getElementById("navigation_page").style.display = "block";
  document.getElementById("login_form_id").style.display = "none";
  document.getElementById("add_book_class").style.display = "none";
  document.getElementById("signup_class").style.display = "none";
  document.getElementById("view_book_class").style.display = "none";
  document.getElementById("view_book_class").style.display = "block";
}
/**
 * Main function
 */
function main() {
  loginDisplay();
  document.getElementById("create_new_account").onclick = createAccountForm;
  document.getElementById("login_id").onclick = loginPage;
  document.getElementById("b_add_new_book_form").onclick = displayBookForm;
  document.getElementById("b_view_book").onclick = getAllBook;
  document.getElementById("add_new_book").onclick = addOrUpdate;
  document.getElementById("add_new_user").onclick = addNewUser;
  document.getElementById("search_book_by_id").onclick=getBookById
  document.getElementById("logout").onclick=logOut
}

/**
 * function to check  user
 */
async function loginPage() {
  let username = document.getElementById("e_user_name").value;
  let password = document.getElementById("e_password").value;
  sessionStorage.setItem("username", username);
  const token = await (
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
  ).json();
  if (token.jwtToken) {
    sessionStorage.setItem("token", token.jwtToken);
    displayMainPage();
  } else {
    document.getElementById("error_div").style.display = "block";
    document.getElementById("wrong_message").innerHTML = token.error;
  }
}
/**
 *  add new user
 */
async function addNewUser() {
  const userId = document.getElementById("u_user_id").value;
  const firstName = document.getElementById("u_first_name").value;
  const lastName = document.getElementById("u_last_name").value;
  const userName = document.getElementById("u_user_name").value;
  const password = document.getElementById("u_user_password").value;
  const result = await (
    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(userId),
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
      }),
    })
  ).json();
  if (result.inserted === true) {
    document.getElementById("signup_class").reset();
    loginDisplay();
  }
}
/**
 * Add new book
 */
async function addNewBook() {
  const result = await (
    await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        ISBN: document.getElementById("b_ISBN").value,
        bookTitle: document.getElementById("b_title").value,
        overDueFee: Number(document.getElementById("b_Over_due_fee").value),
        publishedDate: document.getElementById("b_publishDate").value,
        authorName: document.getElementById("b_publisher").value,
      }),
    })
  ).json();
  console.log(result);
  if (result.inserted === true) {
    document.getElementById("a_form").reset();
    getAllBook();
  }
}
/**
 * fetch all books
 */
async function getAllBook() {
  const books = await (
    await fetch("http://localhost:3000/books", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
  ).json();
  viewBook();

  books.forEach((data) => {
    displayToClient(data);
  });
}

async function getBookById() {
    const bookId=document.getElementById("s_book_id").value
    const books = await (
      await fetch("http://localhost:3000/books/"+bookId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
    ).json();
     viewBook();
      displayToClient(books);
  }
/**
 * Display book to client
 * @param {Object} data
 */
function displayToClient(data) {
  let tBody = document.getElementById("table_body_id");
  const tr = document.createElement("tr");
  const ISBN = document.createElement("td");
  ISBN.textContent = data.ISBN;
  const bookTitle = document.createElement("td");
  bookTitle.textContent = data.bookTitle;
  const overDueFee = document.createElement("td");
  overDueFee.textContent = data.overDueFee;
  const publisher = document.createElement("td");
  publisher.textContent = data.publisher;
  const publishedDate = document.createElement("td");
  publishedDate.textContent = data.publishedDate;
  const deleteButton = document.createElement("button");
  deleteButton.style.backgroundColor = "Red";
  deleteButton.style.backgroundColor = 'margin-left=10px';
  deleteButton.dataset.id = data.bookId;
  deleteButton.textContent = "Remove";
  const updateButton = document.createElement("button");
  updateButton.style.backgroundColor = "Green";
  updateButton.dataset.id = data.bookId;
  updateButton.textContent = "Update";
  tr.appendChild(ISBN);
  tr.appendChild(bookTitle);
  tr.appendChild(overDueFee);
  tr.appendChild(publisher);
  tr.appendChild(publishedDate);
  tr.appendChild(updateButton);
  tr.append(deleteButton);
  tBody.append(tr);
  /**
   * Delete books
   */
  deleteButton.addEventListener("click", removeBook);
  function removeBook() {
    fetch("http://localhost:3000/books/" + data.bookId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((res) => {
        tr.remove();
      });
  }
  /**
   * update book
   */
  updateButton.addEventListener("click", getBookById);

  function getBookById() {
    displayBookForm();
    fetch("http://localhost:3000/books/" + data.bookId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        let date = new Date(data.publishedDate);
        let dFormat =
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        console.log(dFormat);
        document.getElementById("form-title").textContent = "Edit book";
        (document.getElementById("b_ISBN").value = data.ISBN),
          (document.getElementById("b_title").value = data.bookTitle),
          (document.getElementById("b_Over_due_fee").value = data.overDueFee),
          (document.getElementById("b_publishDate").value = dFormat),
          (document.getElementById("b_publisher").value = data.publisher),
          (document.getElementById("add_new_book").dataset.id = data.bookId);
      });
  }
}
/**
 * Add or update books
 * @param {Object} event
 */
async function addOrUpdate(event) {
  const btnId = this.dataset.id;
  event.preventDefault();
  if (btnId) {
    fetch("http://localhost:3000/books/" + btnId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        ISBN: document.getElementById("b_ISBN").value,
        bookTitle: document.getElementById("b_title").value,
        overDueFee: Number(document.getElementById("b_Over_due_fee").value),
        publishedDate: document.getElementById("b_publishDate").value,
        authorName: document.getElementById("b_publisher").value,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        document.getElementById("form-title").textContent = "Add a Book";
        document.getElementById("a_form").reset();
        document.getElementById("add_new_book").dataset.id = "";
        location.reload();
      });
  } else {
    addNewBook();
  }
}
/**
 * Main window onload
 */
window.onload = main;
