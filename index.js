const { program } = require('commander');
const fs = require("fs");
const path = require("path");

// Configure CLI options using Commander
program
  .allowExcessArguments() // Allows positional arguments like 'add'
  .option('-d, --description <string>', 'description') // Description of the expense
  .option('-a --amount <number>', 'amount', parseInt) // Amount of the expense
  .option("-i, --id <number>", "id", parseInt) // Expense ID (for deletion)
  .option("-m, --month <number>", "month", parseInt); // Month filter (for summary)

const args = process.argv;
const action = args[2]; // Extract the action (e.g. 'add', 'delete')

program.parse(args); // Parse options after action

// Destructure parsed options
const { description, amount, id, month } = program.opts();

// Define the path to the expenses JSON file
const filePath = path.join(__dirname, "expenses.json");

// Create the file with an empty array if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Helper: Load and parse expenses from file
const getExpenses = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Helper: Save updated expenses to file
const saveExpenses = (expenses) => {
  fs.writeFileSync(filePath, JSON.stringify(expenses));
}

// Add a new expense entry
const addExpenses = (description, amount) => {
  const expenses = getExpenses();

  // Generate new ID based on last ID in list
  const newId = expenses.length > 0 ? expenses.reverse()[0].id + 1 : 1;

  const newExpense = {
    id: newId,
    date: new Date().toLocaleDateString(), // Save date as readable string
    description,
    amount,
  };

  expenses.push(newExpense);
  saveExpenses(expenses);
  console.log(`Expense added successfully (ID: ${newId})`);
}

// Delete an expense by ID
const deleteExpense = (id) => {
  const expenses = getExpenses();

  const newExpenses = expenses.filter(item => item.id !== id);

  if (newExpenses.length === expenses.length) {
    console.error(`Expense with ID ${id} not found.`);
  }

  saveExpenses(newExpenses);
  console.log(`Expense with ID ${id} deleted successfully.`);
}

// List all expenses in a table format
const listExpenses = () => {
  const expenses = getExpenses().map(({ id, date, description, amount }) => ({
    Id: id,
    Date: date,
    Description: description,
    Amount: `₹${amount}`, // Format with Rupee symbol
  }));

  console.table(expenses);
}

// Show total expenses, optionally filtered by month
const getSummary = (month) => {
  const expenses = getExpenses();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Filter by month if provided
  const filteredExpenses = month
    ? expenses.filter(exp => new Date(exp.date).getMonth() + 1 === month)
    : expenses;

  // Calculate total amount
  const total = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
  const period = month ? months[month - 1] : "all time";

  console.log(`Total expenses for ${period}: ₹${total}`);
}

// Handle CLI actions based on the user's input
switch (action) {
  case "add":
    if (!description || !amount) {
      console.error("Error: 'description' and 'amount' are required for 'add'.");
      process.exit(1);
    }
    addExpenses(description, amount);
    break;

  case "delete":
    if (!id) {
      console.error("Error: 'id' is required for 'delete'.");
      process.exit(1);
    }
    deleteExpense(id);
    break;

  case "list":
    listExpenses();
    break;

  case "summary":
    getSummary(month);
    break;

  default:
    console.error("Invalid action. Use 'add', 'list', 'summary', or 'delete'.");
    break;
}