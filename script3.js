window.onload = function() {
    const logoutButton = document.querySelector('.nav-right a'); 
    logoutButton.onclick = function(event) {
        event.preventDefault(); 

        window.location.href = "index.html";
    };
    user = JSON.parse(localStorage.getItem("logginedUser"));
    if (user) {
        document.getElementById("amountBalance").innerText = user.balance || 0;
    }
};
function deposit() {
   let user = JSON.parse(localStorage.getItem("logginedUser"));
   const dPassword = document.getElementById("dPassword");
    const dAmmount = document.getElementById("depositAmount");
    const dErrorText = document.getElementById("dErrorText");
    const amountBalance = document.getElementById("amountBalance");
    if (dPassword.value == user.password) {
      if (dAmmount.value == "" ||  isNaN(dAmmount.value) || parseInt(dAmmount.value) <= 0) {
        dErrorText.innerHTML = `Amount Incorrect!`;
      } else {
        alert("Amount Added!");
        user.balance += parseInt(dAmmount.value);
        amountBalance.innerHTML = `${user.balance}`;
        localStorage.setItem("logginedUser", JSON.stringify(user));
        dErrorText.innerHTML = "";  // Clear error message
            dAmmount.value = "";        // Reset input field
            dPassword.value = "";
      }
    } else {
      dErrorText.innerHTML = `Password Incorrect!`;
    }
  }
  
  function withdraw() {
    let user = JSON.parse(localStorage.getItem("logginedUser"));
    const wPassword = document.getElementById("wPassword");
    const wAmmount = document.getElementById("withdrawAmount");
    const wErrorText = document.getElementById("wErrorText");
    const amountBalance = document.getElementById("amountBalance");
     const amount = parseInt(wAmmount.value);
    if (wAmmount.value == "" || isNaN(amount) || amount <= 0) {
      wErrorText.innerHTML = `Amount Incorrect!`;
    } else if (amount > user.balance) {
      wErrorText.innerHTML = `Not Enough Money!`;
    } else {
      if (wPassword.value == user.password) {
        alert("Amount Withdrawn!");
        user.balance -= amount;
        amountBalance.innerHTML = `${user.balance}`;
        localStorage.setItem("logginedUser", JSON.stringify(user));
        wErrorText.innerHTML = "";  // Clear error message
            wAmmount.value = "";        // Reset input field
            wPassword.value = ""; 
      } else {
        wErrorText.innerHTML = `Password Incorrect!`;
      }
    }
  }
//   function showDeposit() {
//     const depositAmount = document.getElementById("depositAmount").value;
//     document.getElementById("depositOutput").innerText = "Deposited Amount: $" + depositAmount;
// }

// function showWithdraw() {
//     const withdrawAmount = document.getElementById("withdrawAmount").value;
//     document.getElementById("withdrawOutput").innerText = "Withdrawn Amount: $" + withdrawAmount;
// }
function deposit(){
  
    const userAge = document.getElementById("dpst").value
    console.log(userAge);
    // if(age>=18){
    //     result.innerHTML ="Elligible";
    //     result.style.color = "green";
    // }else{
    //     result.innerHTML = "Not Elligible";
    //     result.style.color = "red"
    // }
}
let totalBudget = 0;
let totalExpense = 0;
let expenses = [];

function setBudget() {
  const budgetInput = document.getElementById("budgetInput").value;
  totalBudget = parseInt(budgetInput);
  updateDisplay();
}

function addExpense() {
  const expenseDetails = document.getElementById("expenseDetails").value;
  const expenseAmount = parseInt(document.getElementById("expenseAmount").value);

  if (expenseDetails && expenseAmount) {
    expenses.push({ detail: expenseDetails, amount: expenseAmount });
    totalExpense += expenseAmount;
    updateDisplay();
    displayExpenses();
  }
}

function updateDisplay() {
  document.getElementById("totalBudget").textContent = `$${totalBudget}`;
  document.getElementById("totalExpense").textContent = `$${totalExpense}`;
  document.getElementById("balanceAmount").textContent = `$${totalBudget - totalExpense}`;
}

function displayExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
      <span>${expense.detail}: $${expense.amount}</span>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

function editExpense(index) {
  const newAmount = prompt("Enter new amount:", expenses[index].amount);
  if (newAmount !== null) {
    totalExpense -= expenses[index].amount;
    expenses[index].amount = parseInt(newAmount);
    totalExpense += expenses[index].amount;
    updateDisplay();
    displayExpenses();
  }
}

function deleteExpense(index) {
  totalExpense -= expenses[index].amount;
  expenses.splice(index, 1);
  updateDisplay();
  displayExpenses();
}

function clearAll() {
  totalBudget = 0;
  totalExpense = 0;
  expenses = [];
  updateDisplay();
  displayExpenses();
}