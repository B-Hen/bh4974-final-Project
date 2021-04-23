"use strict";

var handleBudget = function handleBudget(e) {
  e.preventDefault(); 

  if ($("#BudgetForm").val() == -1) {
    handleError("Budget is required");
    return false;
  }

  sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function () {
    loadBudgetFromServer();
  });
  return false;
};

var handleExpense = function handleExpense(e) {
  e.preventDefault();

  if ($("#expenseItem").val() == '' || $("#expenseCost").val() == -1 || $("#expenseType").val() == '' || $("#expenseNecessary").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function () {
    loadExpenseFromServer();
  });
  return false;
};

var handleDeleteBudget = function handleDeleteBudget(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&budgetId=").concat(id);
  sendAjax('POST', $("#budgetDelete").attr("action"), deleteData, function () {
    loadBudgetFromServer();
  });
  return false;
};

var handleDeleteExpense = function handleDeleteExpense(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&expenseId=").concat(id);
  sendAjax('POST', $("#expenseDelete").attr("action"), deleteData, function () {
    loadExpenseFromServer();
  });
  return false;
};

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
      placeholder: "0",
      min: "0"
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
};

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
};

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
};

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
};

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
    return (/*#__PURE__*/React.createElement("div", {
        key: budget._id,
        className: "budget"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "budgetBudget"
      }, " Budget: ", budget.budget, " "), DeleteBudget(budget._id))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "budgetList"
    }, budgetNodes)
  );
};

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

    if (expense.necessary) {
      necessary = "Yes";
    } else if (!expense.necessary) {
      necessary = "No";
    }

    return (/*#__PURE__*/React.createElement("div", {
        key: expense._id,
        className: "expense"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "expenseItem"
      }, " Item: ", expense.item, " "), /*#__PURE__*/React.createElement("h3", {
        className: "expenseCost"
      }, " Cost: $", expense.cost, " "), /*#__PURE__*/React.createElement("h3", {
        className: "expenseItem"
      }, " Type: ", expense.type, " "), /*#__PURE__*/React.createElement("h3", {
        className: "expenseItem"
      }, " Necessary: ", necessary, " "), DeleteExpense(expense._id))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "expenseList"
    }, expenseNodes)
  );
};

var loadBudgetFromServer = function loadBudgetFromServer() {
  sendAjax('GET', '/getBudget', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
      budgets: data.budgets
    }), document.querySelector("#budgets"));
  });
};

var loadExpenseFromServer = function loadExpenseFromServer() {
  sendAjax('GET', '/getExpense', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseList, {
      expenses: data.expenses
    }), document.querySelector("#expenses"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
    budgets: []
  }), document.querySelector("#budgets"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseList, {
    expenses: []
  }), document.querySelector("#expenses"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetForm, {
    csrf: csrf
  }), document.querySelector("#makeBudget"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseForm, {
    csrf: csrf
  }), document.querySelector("#makeExpense"));
  loadBudgetFromServer();
  loadExpenseFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

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
