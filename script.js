// const htmlCard = `
//     <div class="card ${haveRead}" data-book-index=${i}>
//       <div class="book-title">${book.title}</div>
//       <div class="book-pages">${bookPage} Page(s)</div>
//       <div class="book-author">${bookAuthor}</div>
//       <button class="read-toggle"><i class="material-symbols-outlined">book</i></button>
//       <button class="delete-book"><i class="material-symbols-outlined">
//       delete
//       </i></button>
//     </div>
//         `;

const AddNewBook = new (class {
  addNewBook = document
    .querySelector("#btn-new-book")
    .addEventListener("click", this.showModal);
  newBookModal = document
    .querySelector("#newbook-modal")
    .addEventListener("click", (e) => this.closeModal(e));

  showModal() {
    document.querySelector("#newbook-modal").style.display = "flex";
    this.closeModal;
  }
  closeModal(e) {
    const newBookModal = document.querySelector("#newbook-modal");
    const newbookContainer = document.querySelector("#newbook-container");
    if (!newbookContainer.contains(e.target)) {
      newBookModal.style.display = "none";
    }
  }
})();

const library = new (class {
  books = [];
  addBook(book) {
    this.books.push(book);
    BookCardManager.update(this.books);
  }
  removeBook(book) {
    this.books.splice(book, 1);
  }
  get bookList() {
    return this.books;
  }
})();

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
  get bookData() {
    return [this.title, this.author, this.pages, this.readStatus];
  }
}

const BookCardManager = new (class {
  libraryContainer = document.querySelector("#my-library-container");
  update(books) {
    this.libraryContainer.innerHTML = "";
    books.forEach((book, i) => {
      let [title, author, pages, readStatus] = book.bookData;
      readStatus =
        readStatus == true ? "book-card--read" : "book-card--not-read";
      let cardInnerHTML = `
      <div class="book-card ${readStatus}" data-book-index="${i}">
        <div class="book-card__title">${title}</div>
        <div class="book-card__pages">${pages} Page(s)</div>
        <div class="book-card__author">${author}</div>
        <button class="book-card__read-toggle">
          <i class="material-symbols-outlined">book</i>
        </button>
        <button class="book-card__delete">
          <i class="material-symbols-outlined"> delete </i>
        </button>
      </div>
          `;
      this.libraryContainer.insertAdjacentHTML("afterbegin", cardInnerHTML);
    });
  }
})();

const bookA = new Book("titleA", "authorA", "A", false);
const bookB = new Book("titleB", "authorB", "B", true);

library.addBook(bookA);
library.addBook(bookB);

library.bookList.forEach((book) => {
  console.log(book.title);
});
