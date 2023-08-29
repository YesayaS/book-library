const myLibrary = [];

let newBookForm = document.querySelector(".new-book-background");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

newBookForm.addEventListener("click", (e) => {
  const newFormCard = document.querySelector(".form-card");
  if (!newFormCard.contains(e.target)) {
    newBookForm.style.display = "none";
  }
});

document.getElementById("new-book").addEventListener("click", () => {
  newBookForm.style.display = "flex";
});

document.querySelector("#new-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newBookData = new FormData(e.target);
  const formBookObj = {};
  newBookData.forEach((value, key) => (formBookObj[key] = value));
  console.log(formBookObj);
  const newBook = new Book(
    formBookObj["new-title"],
    formBookObj["new-author"],
    formBookObj["new-pages"],
    formBookObj["new-read"] == "read" ? true : false
  );
  addBookToLibrary(newBook);
  render();
  newBookForm.style.display = "none";
});

function initialBooks() {
  const bookA = new Book("titleA", "authorA", "A pages", false);
  const bookB = new Book("titleB", "authorB", "B pages", true);
  const bookC = new Book("titleC", "authorC", "C pages", true);
  const bookD = new Book("titleD", "authorD", "D pages", false);

  addBookToLibrary(bookA);
  addBookToLibrary(bookB);
  addBookToLibrary(bookC);
  addBookToLibrary(bookD);
}

function render() {
  const library = document.getElementById("my-library");
  library.innerHTML = "";
  myLibrary.forEach((book) => {
    const htmlCard = `
        <div class="card">
        <div class="book-title">${book.title}</div>
        <div class="book-pages">${book.pages}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-read">${book.read}</div>
        </div>
        `;
    library.insertAdjacentHTML("afterbegin", htmlCard);
  });
}

initialBooks();
render();
console.log(myLibrary);
