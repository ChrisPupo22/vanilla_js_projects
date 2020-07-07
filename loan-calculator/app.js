const form = document.querySelector("#calculator-form");
const amount = document.querySelector("#amount");
const interest = document.querySelector("#interest-rate");
const years = document.querySelector("#years");
const resultsList = document.querySelector(".collection");
const resultsSection = document.querySelector('.card-action'); 

loadEventListeners();

function loadEventListeners() {
  // Get results
  // document.addEventListener('submit', getResults);
  // submit form
  form.addEventListener("submit", getResults);
}

function getResults(e) {
  console.log(amount.value, interest.value, years.value);
  

  let principal = parseFloat(amount.value);
  let calcInt = parseFloat(interest.value) / 100 / 12;
  let payments = parseFloat(years.value) * 12;
  let x = Math.pow(1 + calcInt, payments);
  let monthly = (principal * x * calcInt) / (x - 1);

  let payment = 'Monthly Payment: ' + monthly.toFixed(2);
  let total = 'Total Payment: '+ (monthly * payments).toFixed(2);
  let totalInterest = 'Total Interest: ' + (monthly * payments - principal).toFixed(2);

  results = []; 
  
  results.push(payment, total, totalInterest);

  const li = document.createElement("li");

  results.forEach(function(result) {
    
    li.className = "collection-item";
    li.appendChild(document.createTextNode(result));
  });
  console.log(results)

  // Clear input 
  amount.value = ''; 
  interest.value = ''; 
  years.value = '';

  resultsList.appendChild(li); 
  e.preventDefault();
}
