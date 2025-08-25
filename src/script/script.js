const addBook = document.querySelector(".add-book");
const livros = document.querySelector(".livros");
const modal = document.getElementById("bookModal");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn")

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleReadStatus() {
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
  displayBooks();
}

function displayBooks() {
  livros.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("livro");
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

  addBookEventListener();
}

function openModal(){
  modal.showModal();
}

function closeModal(){
  modal.close();
  bookForm.reset();
}

addBook.addEventListener("click", openModal);

cancelBtn.addEventListener("click", closeModal);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").value === "true";

  addBookToLibrary(title, author, pages, read);

  closeModal();
})

function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex(book => book.id === bookId)

  if (bookIndex !== -1 ) {
    myLibrary.splice(bookIndex, 1)

    displayBooks();
  }
}


function toggleBookReadStatus(bookId){

  const book = myLibrary.find(book => book.id === bookId);

  if (book) {
    book.toggleReadStatus();
    displayBooks();
  }
}


function addBookEventListener() {
  const removeButtons = document.querySelectorAll(".remove-book-btn");

  removeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const bookId = this.getAttribute("data-id");
      removeBookFromLibrary(bookId)
    })
  })

  const toggleButtons = document.querySelectorAll(".toggle-read-btn");
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-id");
      toggleBookReadStatus(bookId);
    })
  })
}
addBookToLibrary("O Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dom Casmurro", "Machado de Assis", 256, true);
addBookToLibrary("O Pequeno Príncipe", "Antoine de Saint-Exupéry", 96, false);