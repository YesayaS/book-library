const myLibrary = [];

let newBookFormOverlay = document.querySelector(".new-book-overlay");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

newBookFormOverlay.addEventListener("click", (e) => {
  const newFormCard = document.querySelector(".form-card");
  if (!newFormCard.contains(e.target)) {
    newBookFormOverlay.style.display = "none";
  }
});

document.getElementById("new-book").addEventListener("click", () => {
  newBookFormOverlay.style.display = "flex";
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
  renderLibrary();
  newBookFormOverlay.style.display = "none";
});

function initialBooks() {
  const bookA = new Book("titleA", "authorA", "A", false);
  const bookB = new Book("titleB", "authorB", "B", true);
  const bookC = new Book("titleC", "authorC", "C", true);
  const bookD = new Book("titleD", "authorD", "D", false);

  addBookToLibrary(bookA);
  addBookToLibrary(bookB);
  addBookToLibrary(bookC);
  addBookToLibrary(bookD);
}

function renderLibrary() {
  const libraryContainer = document.getElementById("my-library");
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book, i) => {
    const haveRead = book.read == true ? "have-read" : "have-not-read";
    const bookPage = book.pages == "" ? "-" : book.pages;
    const bookAuthor = book.author == "" ? "-" : book.author;
    const htmlCard = `
    <div class="card ${haveRead}" data-book-index=${i}>
      <div class="book-title">${book.title}</div>
      <div class="book-pages">${bookPage} Page(s)</div>
      <div class="book-author">${bookAuthor}</div>
      <button class="read-toggle"><i class="material-symbols-outlined">book</i></button>
      <button class="delete-book"><i class="material-symbols-outlined">
      delete
      </i></button>
      <a
    </div>
        `;
    libraryContainer.insertAdjacentHTML("afterbegin", htmlCard);
  });

  document.querySelectorAll(".delete-book").forEach((deleteButton) => {
    deleteButton.addEventListener("click", function () {
      const cardElement = this.closest(".card");
      if (cardElement) {
        const cardElementIndex = cardElement.dataset.bookIndex;
        myLibrary.splice(cardElementIndex, 1);
        renderLibrary();
      }
    });
  });

  document.querySelectorAll(".read-toggle").forEach((readToggleButton) => {
    readToggleButton.addEventListener("click", function () {
      let cardElement = this.closest(".card");
      const cardIndex = cardElement.dataset.bookIndex;
      if (myLibrary[cardIndex].read == true) {
        myLibrary[cardIndex].read = false;
      } else {
        myLibrary[cardIndex].read = true;
      }
      renderLibrary();
    });
  });
}

initialBooks();
renderLibrary();
console.log(myLibrary);
