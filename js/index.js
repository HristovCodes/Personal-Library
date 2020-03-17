let myLibrary = [];
const gridElement = document.getElementById("grid");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const readYesInput = document.getElementById("readyes");
const readNoInput = document.getElementById("readno");
const categoriesContainer = document.getElementById("categories");
let yesno = false;
let storage = window.localStorage;
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

loadLibrary();
document.getElementById("addbook").addEventListener("click", createNewBook);

readYesInput.addEventListener("click", () => {
  yesno = true;
});

readNoInput.addEventListener("click", () => {
  yesno = false;
});

function createNewBook() {
  let book = new Book(
    titleInput.value,
    authorInput.value,
    categoryInput.value,
    yesno
  );
  let lib = "";
  if (storage.length === 0) {
    myLibrary.push(book);
    lib = JSON.stringify(myLibrary);
    storage.setItem("books", lib);
    addBookToLibrary(book);
  } else {
    myLibrary = JSON.parse(storage.getItem("books"));
    lib = JSON.stringify(myLibrary);
    if (!lib.includes(JSON.stringify(book))) {
      myLibrary.push(book);
      lib = JSON.stringify(myLibrary);
      storage.setItem("books", lib);
      addBookToLibrary(book);
    }
  }
}

function addBookToLibrary(book) {
  let bookcard = document.createElement("div");
  bookcard.classList.add("card");
  let title = document.createElement("h2");
  title.classList.add("title");
  title.innerText = book.title;
  let author = document.createElement("h3");
  author.classList.add("author");
  author.innerText = book.author;
  let category = document.createElement("h3");
  category.classList.add("category");
  category.innerText = book.category;
  let read = document.createElement("p");
  read.classList.add("read");
  read.innerText = book.read;
  bookcard.append(title);
  bookcard.append(author);
  bookcard.append(category);
  bookcard.append(read);
  document.getElementById("library").append(bookcard);
}

function loadLibrary() {
  if (storage.length !== 0) {
    myLibrary = JSON.parse(storage.getItem("books"));
    myLibrary.forEach(book => {
      addBookToLibrary(book);
    });
  }
}
