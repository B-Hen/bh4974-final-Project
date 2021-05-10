"use strict";

var _csrf = 0;
var isThereABudget = false; //method to handle sending the budget to the server 

var handleBudget = function handleBudget(e) {
  e.preventDefault(); //if no value enter tell user they need to enter one 

  if ($("#BudgetForm").val() == -1) {
    handleError("Budget is required");
    return false;
  }

  loadBudgetFromServerAdd();
  console.log(isThereABudget); //if there is a budget and it's new send it to ther server

  if (!isThereABudget) {
    sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function () {
      console.log("worked");
    });
    isThereABudget = true;
    document.querySelector("#errorMessage").innerHTML = "Budget has been added!";
  } //else tell user the need to update date to change value
  else {
      document.querySelector("#errorMessage").innerHTML = "You already made a budget, go to admin page to update it!";
    }

  return false;
}; //method to send an expense to the serber 


var handleExpense = function handleExpense(e) {
  e.preventDefault(); //if any field is empty tell user all fields are reuired 

  if ($("#expenseItem").val() == '' || $("#expenseCost").val() == -1 || $("#expenseType").val() == '' || $("#expenseNecessary").val() == '') {
    handleError("All fields are required");
    return false;
  } //send information to the server 


  sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function () {
    console.log("worked");
    document.querySelector("#errorMessage").innerHTML = "Expense has been added!";
  });
  return false;
}; //method to tell server to delete a budget from the server


var handleDeleteBudget = function handleDeleteBudget(e) {
  e.preventDefault();
  var csrf = _csrf;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&budgetId=").concat(id); //send info and reload the budget 

  sendAjax('POST', $("#budgetDelete").attr("action"), deleteData, function () {
    loadBudgetFromServer();
    isThereABudget = false;
  });
  return false;
}; //method to tell serber to update a budget and make a new form to put updated calue in 


var handleUpdateBudget = function handleUpdateBudget(e) {
  e.preventDefault();
  var csrf = _csrf;
  var id = e.currentTarget.getAttribute('name');
  ReactDOM.render( /*#__PURE__*/React.createElement(UpdateBudgetForm, {
    csrf: csrf,
    _id: id
  }), document.querySelector("#budgets"));
}; //method to send the updated budget to the server


var handleBudgetUpdateDatabase = function handleBudgetUpdateDatabase(e) {
  e.preventDefault(); //if there is no value tell user they need to enter something in for it to be sent 

  if ($("#updatebudget").val() == -1 || $("#updatebudget").val() == '') {
    handleError("Budget is required");
    return false;
  } //send the new budget to the server


  sendAjax('POST', $("#UpdateBudgetForm").attr("action"), $("#UpdateBudgetForm").serialize(), function () {
    loadBudgetFromServer();
  });
  return false;
}; //method to delete an expense from the server 


var handleDeleteExpense = function handleDeleteExpense(e) {
  e.preventDefault(); //const csrf = document.querySelector('input[name="_csrf"]').value;

  var csrf = _csrf;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&expenseId=").concat(id);
  sendAjax('POST', $("#expenseDelete").attr("action"), deleteData, function () {
    loadExpenseFromServer();
  });
  return false;
}; //method to edit an expense that will later be sent to the sever 


var handleEditExpense = function handleEditExpense(e) {
  e.preventDefault(); //const csrf = document.querySelector('input[name="_csrf"]').value;

  var csrf = _csrf;
  var id = e.currentTarget.getAttribute('name');
  console.log(id);
  ReactDOM.render( /*#__PURE__*/React.createElement(EditExpenseForm, {
    csrf: csrf,
    id: id
  }), document.getElementById("".concat(id)));
}; //method to send update information to the database and then reload the expense 


var handleEditExpenseDatabase = function handleEditExpenseDatabase(e) {
  e.preventDefault();

  if ($("#editexpenseItem").val() == '' || $("#editexpenseCost").val() == -1 || $("#editexpenseType").val() == '' || $("#editexpenseNecessary").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#editexpenseForm").attr("action"), $("#editexpenseForm").serialize(), function () {
    loadExpense();
  });
  return false;
}; //react compenet for the budget 


var BudgetForm = function BudgetForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "BudgetForm",
      onSubmit: handleBudget,
      name: "BudgetForm",
      action: "/maker",
      method: "POST",
      className: "BudgetForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "Budget"
    }, "Budget "), /*#__PURE__*/React.createElement("input", {
      id: "budget",
      type: "number",
      name: "budget",
      placeholder: "0.99",
      min: "0",
      step: "0.1"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeBudgetSubmit",
      type: "submit",
      value: "Make Budget"
    }))
  );
}; //react compone for update form 


var UpdateBudgetForm = function UpdateBudgetForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "UpdateBudgetForm",
      onSubmit: handleBudgetUpdateDatabase,
      name: "UpdateBudgetForm",
      action: "/updateBudget",
      method: "POST",
      className: "UpdateBudgetForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "Budget"
    }, "Budget "), /*#__PURE__*/React.createElement("input", {
      id: "updatebudget",
      type: "number",
      name: "updatebudget",
      placeholder: "0.99",
      min: "0",
      step: "0.01"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_id",
      value: props._id
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeUpdateBudgetSubmit",
      type: "submit",
      value: "Update Budget"
    }))
  );
}; //react component to delete a budget 


var DeleteBudget = function DeleteBudget(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "budgetDelete",
      onClick: handleDeleteBudget,
      name: props,
      action: "/deleteBudget",
      method: "POST",
      className: "budgetDelete"
    }, "Delete Budget")
  );
}; //react compinent to update a budget 


var UpdateBudget = function UpdateBudget(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "updateBudget",
      onClick: handleUpdateBudget,
      name: props,
      className: "updateBudget"
    }, "Update Budget")
  );
}; //react component for the expense form 


var ExpenseForm = function ExpenseForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "expenseForm",
      onSubmit: handleExpense,
      name: "expenseForm",
      action: "/makerExpense",
      method: "POST",
      className: "expenseForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "item"
    }, "Item: "), /*#__PURE__*/React.createElement("input", {
      id: "expenseItem",
      type: "text",
      name: "item",
      placeholder: "Ex. Banana"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "cost"
    }, "Cost: "), /*#__PURE__*/React.createElement("input", {
      id: "expenseCost",
      type: "number",
      name: "cost",
      placeholder: "0.99",
      min: "0.0",
      step: "0.01"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "type"
    }, "Type: "), /*#__PURE__*/React.createElement("select", {
      name: "type",
      id: "expenseType"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Food/Drink"
    }, "Food/Drink"), /*#__PURE__*/React.createElement("option", {
      value: "School"
    }, "School"), /*#__PURE__*/React.createElement("option", {
      value: "Housing"
    }, "Housing"), /*#__PURE__*/React.createElement("option", {
      value: "Utilities"
    }, "Untilities"), /*#__PURE__*/React.createElement("option", {
      value: "Clothing"
    }, "Clothing"), /*#__PURE__*/React.createElement("option", {
      value: "Medical/Healthcare"
    }, "Medical/Healthcare"), /*#__PURE__*/React.createElement("option", {
      value: "Transportation"
    }, "Transportation"), /*#__PURE__*/React.createElement("option", {
      value: "Insurance"
    }, "Insurance"), /*#__PURE__*/React.createElement("option", {
      value: "Other"
    }, "Other")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "necessary"
    }, "Necessary: "), /*#__PURE__*/React.createElement("select", {
      name: "necessary",
      id: "expenseNecessary"
    }, /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Yes"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "No")), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeExpenseSubmit",
      type: "submit",
      value: "Make Expense"
    }))
  );
}; //react component for the edit expense form 


var EditExpenseForm = function EditExpenseForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "editexpenseForm",
      onSubmit: handleEditExpenseDatabase,
      name: "editexpenseForm",
      action: "/editExpense",
      method: "POST",
      className: "editexpenseForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "item"
    }, "Item: "), /*#__PURE__*/React.createElement("input", {
      id: "editexpenseItem",
      type: "text",
      name: "item",
      placeholder: "Ex. Banana"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "cost"
    }, "Cost: "), /*#__PURE__*/React.createElement("input", {
      id: "editexpenseCost",
      type: "number",
      name: "cost",
      placeholder: "0.99",
      min: "0.0",
      step: "0.01"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "type"
    }, "Type: "), /*#__PURE__*/React.createElement("select", {
      name: "type",
      id: "editexpenseType"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Food/Drink"
    }, "Food/Drink"), /*#__PURE__*/React.createElement("option", {
      value: "School"
    }, "School"), /*#__PURE__*/React.createElement("option", {
      value: "Housing"
    }, "Housing"), /*#__PURE__*/React.createElement("option", {
      value: "Utilities"
    }, "Untilities"), /*#__PURE__*/React.createElement("option", {
      value: "Clothing"
    }, "Clothing"), /*#__PURE__*/React.createElement("option", {
      value: "Medical/Healthcare"
    }, "Medical/Healthcare"), /*#__PURE__*/React.createElement("option", {
      value: "Transportation"
    }, "Transportation"), /*#__PURE__*/React.createElement("option", {
      value: "Insurance"
    }, "Insurance"), /*#__PURE__*/React.createElement("option", {
      value: "Other"
    }, "Other")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "necessary"
    }, "Necessary: "), /*#__PURE__*/React.createElement("select", {
      name: "necessary",
      id: "editexpenseNecessary"
    }, /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Yes"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "No")), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_id",
      value: props.id
    }), /*#__PURE__*/React.createElement("input", {
      className: "editExpenseSubmit",
      type: "submit",
      value: "Edit Expense"
    }))
  );
}; //react component for delete expense button 


var DeleteExpense = function DeleteExpense(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "expenseDelete",
      onClick: handleDeleteExpense,
      name: props,
      action: "/deleteExpense",
      method: "POST",
      className: "expenseDelete"
    }, "Delete Expense")
  );
}; //react component for edit expense button 


var EditExpense = function EditExpense(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "editExpense",
      onClick: handleEditExpense,
      name: props,
      className: "editExpense"
    }, "Edit Expense")
  );
}; //react componet to hold a list of objects from ther database sent from server 


var BudgetList = function BudgetList(props) {
  if (props.budgets.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "budgetList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyBudget"
      }, "No Budget yet"))
    );
  }

  var budgetNodes = props.budgets.map(function (budget) {
    var _id = budget._id;
    return (/*#__PURE__*/React.createElement("div", {
        key: budget._id,
        className: "budget"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "budgetBudget"
      }, " Budget: ", budget.budget, " "), DeleteBudget(_id), UpdateBudget(_id))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "budgetList"
    }, budgetNodes)
  );
}; //react compinent to hold the budgets sent from server from database for the app portion of the app


var BudgetListApp = function BudgetListApp(props) {
  if (props.budgets.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "budgetList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyBudget"
      }, "No Budget yet"))
    );
  }

  var budgetNodes = props.budgets.map(function (budget) {
    var _id = budget._id;
    return (/*#__PURE__*/React.createElement("div", {
        key: budget._id,
        className: "budget"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "budgetBudget"
      }, " Budget: ", budget.budget, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "budgetList"
    }, budgetNodes)
  );
}; //react componet to hold a list of expense objects from the database sent from the server 


var ExpenseList = function ExpenseList(props) {
  if (props.expenses.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "expenseList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyExpense"
      }, "No Expenses yet"))
    );
  }

  var expenseNodes = props.expenses.map(function (expense) {
    var necessary;
    var id = expense._id;

    if (expense.necessary) {
      necessary = "Yes";
    } else if (!expense.necessary) {
      necessary = "No";
    }

    return (/*#__PURE__*/React.createElement("div", {
        key: expense._id,
        className: "expense",
        id: expense._id
      }, /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Item: ", expense.item, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseCost"
      }, " Cost: $", expense.cost, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Type: ", expense.type, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Necessary: ", necessary, " "), /*#__PURE__*/React.createElement("span", null, DeleteExpense(id)), /*#__PURE__*/React.createElement("span", null, EditExpense(id)))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "expenseList"
    }, expenseNodes)
  );
}; //react component of a list of expenses for the app potion of the site 


var ExpenseListApp = function ExpenseListApp(props) {
  if (props.expenses.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "expenseList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyExpense"
      }, "No Expenses yet"))
    );
  }

  var expenseNodes = props.expenses.map(function (expense) {
    var necessary;
    var id = expense._id;

    if (expense.necessary) {
      necessary = "Yes";
    } else if (!expense.necessary) {
      necessary = "No";
    }

    return (/*#__PURE__*/React.createElement("div", {
        key: expense._id,
        className: "expense",
        id: expense._id
      }, /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Item: ", expense.item, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseCost"
      }, " Cost: $", expense.cost, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Type: ", expense.type, " "), /*#__PURE__*/React.createElement("span", {
        className: "expenseItem"
      }, " Necessary: ", necessary, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "expenseList"
    }, expenseNodes)
  );
}; //function to load budget from the server


var loadBudgetFromServer = function loadBudgetFromServer() {
  sendAjax('GET', '/getBudget', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
      budgets: data.budgets
    }), document.querySelector("#budgets"));
  });
}; //function to load bugets from the server for the app portion of the site 


var loadBudgetFromServerApp = function loadBudgetFromServerApp() {
  var budget;
  var month = 0,
      week = 0,
      day = 0;
  var totalSpent = 0,
      moneyLeftToSpend = 0;
  var expenses;
  sendAjax('GET', '/getBudget', null, function (data) {
    budget = data.budgets;
    console.log(budget);

    if (budget.length > 0) {
      budget = data.budgets[0].budget;
      sendAjax('GET', '/getExpense', null, function (data) {
        expenses = data.expenses;
        console.log(expenses);

        for (var i = 0; i < expenses.length; i++) {
          totalSpent += expenses[i].cost;
        }

        moneyLeftToSpend = budget - totalSpent;
        month = budget - totalSpent;
        week = (budget - totalSpent) / 4;
        day = (budget - totalSpent) / 30;
        console.log(month + " " + week + " " + day);
        document.querySelector("#appMessage").innerHTML = "Budget: $".concat(budget.toFixed(2), " | Total Spent: $").concat(totalSpent.toFixed(2), " | Money left to spend: $").concat(moneyLeftToSpend.toFixed(2), "\n                <br>Left for the month: $").concat(month.toFixed(2), " | Left for the week: $").concat(week.toFixed(2), "  |  Left for the day: $").concat(day.toFixed(2));
      });
    }

    ReactDOM.render( /*#__PURE__*/React.createElement(BudgetListApp, {
      budgets: data.budgets
    }), document.querySelector("#budgets"));
  });
}; //function to load budget from the server for the app portion of the site 


var loadBudgetFromServerAdd = function loadBudgetFromServerAdd() {
  sendAjax('GET', '/getBudget', null, function (data) {
    console.log(data.budgets.length);

    if (data.budgets.length == 1) {
      isThereABudget = true;
    }
  });
}; //function to load expense from the server 


var loadExpenseFromServer = function loadExpenseFromServer() {
  sendAjax('GET', '/getExpense', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseList, {
      expenses: data.expenses
    }), document.querySelector("#expenses"));
  });
}; //function to load expense from the server for the app portion of the site 


var loadExpenseFromServerApp = function loadExpenseFromServerApp() {
  sendAjax('GET', '/getExpense', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseListApp, {
      expenses: data.expenses
    }), document.querySelector("#expenses"));
  });
}; //function to load expense but to also rewrite thereact component and properly display it on the site


var loadExpense = function loadExpense() {
  var ExpenseList1 = function ExpenseList1(props) {
    if (props.expenses.length === 0) {
      return (/*#__PURE__*/React.createElement("div", {
          className: "expenseList"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "emptyExpense"
        }, "No Expenses yet"))
      );
    }

    var expenseNodes = props.expenses.map(function (expense) {
      var necessary;
      var id = expense._id;

      if (expense.necessary) {
        necessary = "Yes";
      } else if (!expense.necessary) {
        necessary = "No";
      }

      return (/*#__PURE__*/React.createElement("div", {
          key: expense._id,
          className: "expense",
          id: expense._id
        }, /*#__PURE__*/React.createElement("span", {
          className: "expenseItem"
        }, " Item: ", expense.item, " "), /*#__PURE__*/React.createElement("span", {
          className: "expenseCost"
        }, " Cost: $", expense.cost, " "), /*#__PURE__*/React.createElement("span", {
          className: "expenseItem"
        }, " Type: ", expense.type, " "), /*#__PURE__*/React.createElement("span", {
          className: "expenseItem"
        }, " Necessary: ", necessary, " "), /*#__PURE__*/React.createElement("span", null, " ", DeleteExpense(id), " "), /*#__PURE__*/React.createElement("span", null, EditExpense(id)))
      );
    });
    return (/*#__PURE__*/React.createElement("div", {
        className: "expenseList"
      }, expenseNodes)
    );
  };

  sendAjax('GET', '/getExpense', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseList1, {
      expenses: data.expenses
    }), document.querySelector("#expenses"));
  });
}; //react compinent to make the home page / landing page 


var Home = function Home(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Welcome to the Budget and Expense Tracker App"), /*#__PURE__*/React.createElement("p", null, "Head to the Edit Tab to enter a Budget and some expenses!"), /*#__PURE__*/React.createElement("p", null, "Head to the App Page to see those Buget and Expenses that you made before"), /*#__PURE__*/React.createElement("p", null, "Head to Admin to look at all the Expense and Budgets"), /*#__PURE__*/React.createElement("p", null, "And don't forget to logout when done :)"), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props
    }))
  );
}; //react component to make the documentation page 


var Documentation = function Documentation() {
  return (/*#__PURE__*/React.createElement("div", {
      id: "documentation"
    }, /*#__PURE__*/React.createElement("h1", null, "Documentation"), /*#__PURE__*/React.createElement("h2", null, "Site Purpose"), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "For this project I wanted to expanded my project 1 to include using MongoDB, React, and a MVP model. The purpose is similiar to the first, the app allows users to enter a budget that is then broken down into how much the user should spend for the month, week, and day. The user will also be able to enter in as many expense they want which is then factor into how they must budget. User can also update that budget anytime they want and edit it, the same with expenses. User can make there own account and if they need to they can also change the password to that account. The purpose of the app is to help user manange and save their money by budgeting and keeping track of their expenses. I am also using React to render most things on the site."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Database"), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "This project uses MongoDB to store user accounts, budgets, and expenese. From the database I can pull the user information and display it back to them. I can also use the app to change values of users budgets and edit user expenses, or delete both. All changes are then reflected in the database and stored for future use."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "What went right and what went wrong?"), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "I'll start with what went right :). I was able to fully convert my project 1 to use MongoDB, React, MVP model, etc which was the core. I was also able to update the CSS and in my opinion looks way more modern than my first project and is simpler to look at. I was also able to to make different user accounts that are all to some level secure. I was also able to make it so user can change their passwords and I was able to do it pretty quickly, something I thought would take me a very long time so I am very happy with it. I was also able to display to the user important information about how much they should budget for the month, week, day. But of course there are problems as well. THe biggest is I had so many other finals and projects due at the same time in addition to work so I didn't have tome to implement some cool features. The biggest thing I wanted to add was sorting expenses so that the user can choose what type of data was displayed making it easier to track spending habits. I also thoought of using D3 to make some really nice charts to go with displaying spending habits to make things more user friend, (plus I am learning D3 for another class right now). But I didn't get the time to explore that option. I really like where this project is going so I think over the summer I am going to continue working on it to add those features! Also I keep getting this weird error for React components and I am not sure how to fix it without completely rewrittening my code, but since I don't have time to fix it and it's just a warning I'll leave it be and work on it over the summer."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "If I continue..."), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "If I continue I really want to add some way to sort the expenese as well as a way to add D3 into the project so I can use graphs to show spending habits making it easier for the user to understand. And if at all possible I think this would be cool to link to an actual bank account and update the expense and such automatically."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Above and Beyond"), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "I think I went above and beyond in the CSS of the app. I think it looks way nicer than in my first project and I think it looks a lot more modern than the first project. I also did all the CSS myself. The design is simple and easy to navigate and once again I was able to add so neat litle animation with the CSS that makes looking throught expense a bit nicer too."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Resources"), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "CSS and HTML doc: ", /*#__PURE__*/React.createElement("a", {
      className: "docLink",
      href: "https://www.w3schools.com/"
    }, "w3schools.com")), /*#__PURE__*/React.createElement("p", {
      className: "Doc"
    }, "MongoDB doc: ", /*#__PURE__*/React.createElement("a", {
      className: "docLink",
      href: "https://docs.mongodb.com/"
    }, "docs.mongodb.com")))
  );
}; //function to creat the app window 


var createAppWindow = function createAppWindow(csrf) {
  loadBudgetFromServerApp();
  loadExpenseFromServerApp();
  ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
  document.querySelector("#errorMessage").innerHTML = "";
  ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
}; //function to create the Add window of the site 


var createAddWindow = function createAddWindow(csrf) {
  document.querySelector("#appMessage").innerHTML = "";
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetForm, {
    csrf: csrf
  }), document.querySelector("#makeBudget"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseForm, {
    csrf: csrf
  }), document.querySelector("#makeExpense"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
  document.querySelector("#errorMessage").innerHTML = "";
  ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
}; //function to make the home window of the site


var createHomeWindow = function createHomeWindow(csrf) {
  document.querySelector("#appMessage").innerHTML = "";
  ReactDOM.render( /*#__PURE__*/React.createElement(Home, {
    csrf: csrf
  }), document.querySelector("#home"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
  document.querySelector("#errorMessage").innerHTML = "";
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
}; //function to creat the documentation window of the site 


var createDocumentationWindow = function createDocumentationWindow() {
  ReactDOM.render( /*#__PURE__*/React.createElement(Documentation, null), document.querySelector("#doc"));
  document.querySelector("#appMessage").innerHTML = "";
  document.querySelector("#errorMessage").innerHTML = "";
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
}; //function to creat the admin window of the site 


var createAdminWindodw = function createAdminWindodw(csrf) {
  document.querySelector("#appMessage").innerHTML = "";
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
    budgets: []
  }), document.querySelector("#budgets"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseList, {
    expenses: []
  }), document.querySelector("#expenses"));
  loadBudgetFromServer();
  loadExpenseFromServer();
  ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
  document.querySelector("#errorMessage").innerHTML = "";
  ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
}; //function to setup the site and give each button a function and set up a lading page 


var setup = function setup(csrf) {
  _csrf = csrf;
  var homeButton = document.querySelector("#homeButton");
  var editButton = document.querySelector("#addButton");
  var appButton = document.querySelector("#appButton");
  var adminButton = document.querySelector("#adminButton");
  var docButton = document.querySelector("#documentationButton");
  homeButton.addEventListener("click", function (e) {
    e.preventDefault();
    createHomeWindow(csrf);
    return false;
  });
  editButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAddWindow(csrf);
    return false;
  });
  appButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAppWindow(csrf);
    return false;
  });
  adminButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAdminWindodw(csrf);
    return false;
  });
  docButton.addEventListener("click", function (e) {
    e.preventDefault();
    createDocumentationWindow();
    return false;
  });
  loadBudgetFromServerAdd();
  createHomeWindow(csrf);
}; //function to het the csrf of the page 


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //function to get a token for the page


$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
