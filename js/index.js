import db from "./firebase.js";

const gridElement = document.getElementById("grid");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const readYesInput = document.getElementById("readyes");
const readNoInput = document.getElementById("readno");
const categoriesContainer = document.getElementById("categories");
const library = document.getElementById("library");
let yesno = false;

loadLibrary();

function Book(title, author, category, read) {
  this.title = "Title: " + title;
  this.author = "Author: " + author;
  this.category = "Category: " + category;
  if (read == true) {
    this.read = "Finished reading";
  } else {
    this.read = "Needs to be read";
  }
}

document.getElementById("addbook").addEventListener("click", createNewBook);

readYesInput.addEventListener("click", () => {
  yesno = true;
});

readNoInput.addEventListener("click", () => {
  yesno = false;
});

function createNewBook() {
  let book = new Book(
    titleInput.value === "" ? "Harry Potter" : titleInput.value,
    authorInput.value === "" ? "J. K. Rowling" : authorInput.value,
    categoryInput.value === "" ? "Fantasy" : categoryInput.value,
    yesno === null ? true : false
  );
  clearForm();
  //test to see if it writes to db
  db.setBook(window.localStorage.getItem("userID"), book, book.title);
  loadLibrary();
}

async function loadLibrary() {
  const lib = await db.getLib(window.localStorage.getItem("userID"));
  const libData = Object.values(lib);
  library.innerHTML = "";
  libData.forEach((el) => {
    let bookcard = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("h3");
    let category = document.createElement("h3");
    let read = document.createElement("p");
    bookcard.classList.add("card");
    title.classList.add("title");
    author.classList.add("author");
    category.classList.add("category");
    read.classList.add("read");
    title.innerText = el.title;
    author.innerText = el.author;
    category.innerText = el.category;
    read.innerText = el.read;
    bookcard.append(title);
    bookcard.append(author);
    bookcard.append(category);
    bookcard.append(read);
    library.append(bookcard);
  });
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  categoryInput.value = "";
  readNoInput.checked = false;
  readYesInput.checked = false;
}
