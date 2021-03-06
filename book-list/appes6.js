// book class with constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.getElementById("book-list");
    // create tr element
    const row = document.createElement("tr");

    //insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" >X</a></td>
    `;

    bookList.appendChild(row);
  }

  showAlert(message, className) {
    // create the element
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
  
    // Insert alert
    container.insertBefore(div, form);
  
    // Timeout for form
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2200);
  }

  clearFields() {
    let form = document.getElementById("book-form");
    form.reset();
  };

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove(); 
      const ui = new UI(); 
      ui.showAlert('Book Removed!', 'success');
    }
  }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books; 
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books; 
    }

    static displayBooks() {
        const books = Store.getBooks(); 

        books.forEach(function(book) {
            const ui = new UI; 

            ui.addBookToList(book); 
        })

    }

    static addBook(book) {  
        const books = Store.getBooks(); 

        // adds book to the array
        books.push(book); 

        // re-set local storage with the new book
        localStorage.setItem('books', JSON.stringify(books)); 
        console.log(books); 
        
    }
    static deleteBook(isbn) {
        const books = Store.getBooks(); 
        books.forEach(function(book) {
            if(book.isbn === isbn){
                let pos = books.indexOf(book)
                books.splice(pos, 1); 
            }
        })
        // reset the local storage
        localStorage.setItem('books', JSON.stringify(books)); 
    }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks()); 


// event Listener for adding a book 
document.getElementById("book-form").addEventListener("submit", function (e) {
    // form values...
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
  
    // this instantiates a book with the values created
    const book = new Book(title, author, isbn)
  
    // Instantiate UI object
    const ui = new UI();
  
    // validation
    if (title === "" || author === "" || isbn === "") {
      ui.showAlert("please fill in required fields", "error");
    } else {
      // Add book to List
      ui.addBookToList(book);  

      // Add Book to local storage
      Store.addBook(book); 

      // add success message
      ui.showAlert("Successfully added book!", "success");
      // clear input values
      ui.clearFields();
    }
      
    e.preventDefault();
  });

  // event listener for deletion of book
  document.getElementById('book-list').addEventListener("click", function (e) {
    const ui = new UI(); 
  
    ui.deleteBook(e.target); 

    // delete from LS 
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent); 
  
    e.preventDefault();
  });