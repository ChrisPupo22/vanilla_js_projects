// document.getElementById()
// gets one element by its ID 
const li = document.createElement('li'); 

//add class
li.className = 'collection-item'; 

// add attribute
li.setAttribute('title', 'New Item'); 

// create text node & append
li.appendChild(document.createTextNode('hello, world'));

// append li to document
document.body.appendChild(li)


console.log(li)