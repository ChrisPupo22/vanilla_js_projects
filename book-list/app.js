// Book Constructor handles book obj
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor set of prototype methods for UI
function UI() {}

// Add book to the list
UI.prototype.addBookToList = function (book) {
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

  console.log(row);
};

//show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove(); 
  }
}

// Clear fields
UI.prototype.clearFields = function () {
  let form = document.getElementById("book-form");
  form.reset();
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // form values...
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // this instantiates a book with the values created
  const book = new Book(title, author, isbn);

  // Instantiate UI object
  const ui = new UI();

  // validation
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("please fill in required fields", "error");
  } else {
    // Add book to List
    ui.addBookToList(book);
    // add success message
    ui.showAlert("Successfully added book!", "success");
    // clear input values
    ui.clearFields();
  }
    

  e.preventDefault();
});

// delete event listener
  // const bookList = document.getElementById("book-list");
document.getElementById('book-list').addEventListener("click", function (e) {
  const ui = new UI(); 

  ui.deleteBook(e.target); 

  //Show alert
  ui.showAlert('Book Removed!', 'success'); 

  e.preventDefault();
});

