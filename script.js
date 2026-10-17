
const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");

let transactions = [];

function formatMoney(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function updateDashboard() {
  const income = transactions
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  balanceDisplay.textContent = formatMoney(income - expenses);
  incomeDisplay.textContent = formatMoney(income);
  expensesDisplay.textContent = formatMoney(expenses);

  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = "<li>No transactions yet.</li>";
    return;
  }

  transactions.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.description} - ${
      item.type === "income" ? "+" : "-"
    }${formatMoney(item.amount)}`;

    transactionList.appendChild(li);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }

  transactions.push({
    description: description,
    amount: amount,
    type: typeInput.value
  });

  updateDashboard();
  form.reset();
});

updateDashboard();
