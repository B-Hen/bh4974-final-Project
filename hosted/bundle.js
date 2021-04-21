"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var handleBudget = function handleBudget(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#BudgetForm").val() == -1) {
    handleError("Budget is required");
    return false;
  }

  console.log($("#BudgetForm").serialize());
  sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function () {
    console.log("worked check mongo Compass");
    loadBudgetFromServer();
  });
  return false;
};

var handleExpense = function handleExpense(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#expenseItem").val() == '' || $("#expenseCost").val() == -1 || $("#expenseType").val() == '' || $("#expenseNecessary").val() == '') {
    handleError("All fields are required");
    return false;
  }

  console.log($("#expenseForm").serialize());
  sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function () {
    console.log("check mongo");
  });
  return false;
};

var handleDeleteDomo = function handleDeleteDomo(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  var id = e.currentTarget.getAttribute('name');
  var deleteData = "_csrf=".concat(csrf, "&domoId=").concat(id);
  sendAjax('POST', $("#domoDelete").attr("action"), deleteData, function () {
    loadDomosFromServer();
  });
  return false;
};

var DeleteButton = function DeleteButton(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "domoDelete",
      onClick: handleDeleteDomo,
      name: props,
      action: "/deleteDomo",
      method: "POST",
      className: "domoDelete",
      key: ""
    }, "Delete Domo")
  );
};

var DomoForm = function DomoForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "domoName",
      type: "text",
      name: "name",
      placeholder: "Domo Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "domoAge",
      type: "text",
      name: "age",
      placeholder: "Domo Age"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "level"
    }, "Level: "), /*#__PURE__*/React.createElement("input", {
      id: "domoLevel",
      type: "text",
      name: "level",
      placeholder: "Domo Level"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeDomoSubmit",
      type: "submit",
      value: "Make Domo"
    }))
  );
};

var BudgetForm = function BudgetForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "BudgetForm",
      onSubmit: handleBudget,
      name: "BudgetForm",
      action: "/makerBudget",
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
      className: "makeDomoSubmit",
      type: "submit",
      value: "Make Expense"
    }))
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "domoList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyDomo"
      }, "No Domos yet"))
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return (/*#__PURE__*/React.createElement("div", {
        key: domo._id,
        className: "domo"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "domo face",
        className: "domoFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "domoName"
      }, " Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "domoAge"
      }, " Age: ", domo.age, " "), /*#__PURE__*/React.createElement("h3", {
        className: "domoLevel"
      }, " Level: ", domo.level, " "), DeleteButton(domo._id))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, domoNodes)
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
      }, " Budget: ", budget.budget, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "budgetList"
    }, budgetNodes)
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var loadBudgetFromServer = function loadBudgetFromServer() {
  sendAjax('GET', '/getBudget', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
      budgets: data.budgets
    }), document.querySelector("#budget"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector("#domos"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetList, {
    budgets: []
  }), document.querySelector("#budget"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BudgetForm, {
    csrf: csrf
  }), document.querySelector("#makeBudget"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ExpenseForm, {
    csrf: csrf
  }), document.querySelector("#makeExpense"));
  loadBudgetFromServer();
  loadDomosFromServer();
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
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
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
