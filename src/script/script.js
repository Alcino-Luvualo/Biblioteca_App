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

  info() {
    const readStatus = this.read ? "Já foi lido" : "Ainda não foi lido";
    return `${this.title} por ${this.author}, ${this.pages} páginas, ${readStatus}`;
  }
}
function addBookToLibrary(title, author, pages, read) {
  const novoLivro = new Book(title, author, pages, read);
  myLibrary.push(novoLivro);
  displaybook();
}

function displaybook() {
  livros.innerHtml = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    div.classList.add("livro");
    bookCard.setAttribute("data-id", book.id);

    bookCard.innerHTML = `
    <div class="book-info">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong>${book.author}</p>
      <p><strong>Paginas:</strong>${book.pages}</p>
      <p><strong>Status:</strong>${book.read ? "Lido" : "Não Lido"}</p>
    </div>
    <div class ="book-actions">
      <button class = "toggle-read-btn" data-id= "${book.id}">
        ${book.read ? "Marcar como Não lido" : "Marcar como lido"}
      </button>
      <button class = "remove-book-btn" data-id = "${book.id}">
        Remover Livro
      </button>
    </div>
      `;

      livros.appendChild(bookCard);
  });

  addEventListener();
}

addBookToLibrary("O Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dom Casmurro", "Machado de Assis", 256, true);
addBookToLibrary("O Pequeno Príncipe", "Antoine de Saint-Exupéry", 96, false);