# 💰 Expense Tracker CLI

A simple Node.js command-line tool for tracking your daily expenses using JSON file storage.
Sample solution for the <a href="https://roadmap.sh/projects/expense-tracker" rel="nofollow">task-tracker</a> challenge from <a href="https://roadmap.sh/" rel="nofollow">roadmap.sh</a>.

## ✅ Features

- Add new expenses with description and amount.
- List all expenses in a formatted table.
- Delete expenses by ID.
- View total expense summary for all time or a specific month.

## 🔧 Prerequisites

- Node.js installed on your system.

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-cli.git
```

### 2. Navigate to the Project Directory

```bash
cd expense-tracker-cli
```

### 3. Install Dependencies

```bash
npm install
```

## ▶️ Usage

### Add an Expense

```bash
node index.js add --description "Lunch" --amount 150
```

### List All Expenses

```bash
node index.js list
```

### Delete an Expense by ID

```bash
node index.js delete --id 2
```

### View Summary for a Specific Month

```bash
node index.js summary --month 4
```

### View Total Summary (All Time)

```bash
node index.js summary
```

## 📁 JSON File Structure (`expenses.json`)

```json
[
  {
    "id": 1,
    "date": "4/30/2025",
    "description": "Lunch",
    "amount": 150
  }
]
```

> ⚠️ `expenses.json` is auto-created in the same directory if not present.

## 🛠 Sample Commands

```bash
node index.js add -d "Snacks" -a 60
node index.js delete -i 1
node index.js summary -m 3
```