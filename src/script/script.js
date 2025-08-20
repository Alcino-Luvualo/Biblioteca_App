const addBook = document.querySelector(".add-book");
const livros = document.querySelector(".livros");

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}
function addBookToLibrary(title, author, pages, read) {
  const novoLivro = new Book(title, author, pages, read);
  myLibrary.push(novoLivro);
  displaybook();
}
