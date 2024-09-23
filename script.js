const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.textContent = ''; // Clear the book list
    
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index;
        
        const title = document.createElement('h3');
        title.textContent = book.title;
        bookCard.appendChild(title);
        
        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);
        
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);
        
        const readStatus = document.createElement('p');
        readStatus.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(readStatus);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeBook(index);
        bookCard.appendChild(removeBtn);
        
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Read';
        toggleBtn.onclick = () => toggleReadStatus(index);
        bookCard.appendChild(toggleBtn);
        
        bookList.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Dialog and form handling
const dialog = document.getElementById('bookDialog');
const newBookBtn = document.getElementById('newBookBtn');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    
    bookForm.reset();
    dialog.close();
});

// Add some initial books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

// Initial display
displayBooks();