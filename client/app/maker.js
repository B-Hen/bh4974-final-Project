const handleBudget = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#BudgetForm").val() == -1) {
        handleError("Budget is required");
        return false;
    }

    sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function() {
        loadBudgetFromServer();
    });

    return false;
};

const handleExpense = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#expenseItem").val() == '' || $("#expenseCost").val() == -1 || $("#expenseType").val() == '' || $("#expenseNecessary").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function() {
        loadExpenseFromServer();
    });

    return false;
};

const handleDeleteBudget = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&budgetId=${id}`;

    sendAjax('POST', $("#budgetDelete").attr("action"), deleteData, function() {
        loadBudgetFromServer();
    });

    return false;
}

const handleDeleteExpense = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&expenseId=${id}`;

    sendAjax('POST', $("#expenseDelete").attr("action"), deleteData, function() {
        loadExpenseFromServer();
    });

    return false;
}

const BudgetForm = (props) => {
    return (
        <form id="BudgetForm"
        onSubmit={handleBudget}
        name="BudgetForm"
        action="/makerBudget"
        method="POST"
        className="BudgetForm"
        >
            <label htmlFor="Budget">Budget </label>
            <input id="budget" type="number" name="budget" placeholder="0" min="0" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeBudgetSubmit" type="submit" value="Make Budget" />
        </form>
    );
};

const DeleteBudget = (props) => {
    return (
        <button id="budgetDelete"
        onClick={handleDeleteBudget}
        name={props}
        action="/deleteBudget"
        method="POST"
        className="budgetDelete"
        >Delete Budget</button>
    )
}

const ExpenseForm = (props) => {
    return (
        <form id="expenseForm"
        onSubmit={handleExpense}
        name="expenseForm"
        action="/makerExpense"
        method="POST"
        className="expenseForm"
        >
            <label htmlFor="item">Item: </label>
            <input id="expenseItem" type="text" name="item" placeholder="Ex. Banana" />
            <label htmlFor="cost">Cost: </label>
            <input id="expenseCost" type="number" name="cost" placeholder="0.99" min="0.0" step="0.01"/>
            <label htmlFor="type">Type: </label>
            <select name="type" id="expenseType">
                <option value="Food/Drink">Food/Drink</option>
                <option value="School">School</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Untilities</option>
                <option value="Clothing">Clothing</option>
                <option value="Medical/Healthcare">Medical/Healthcare</option>
                <option value="Transportation">Transportation</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
            </select>
            <label htmlFor="necessary">Necessary: </label>
            <select name="necessary" id="expenseNecessary">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Expense" />

        </form>
    );
};

const DeleteExpense = (props) => {
    return (
        <button id="expenseDelete"
        onClick={handleDeleteExpense}
        name={props}
        action="/deleteExpense"
        method="POST"
        className="expenseDelete"
        >Delete Expense</button>
    )
}

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                <h3 className="domoLevel"> Level: {domo.level} </h3>
                {DeleteButton(domo._id)}
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}      
        </div>
    );
};

const BudgetList = function(props) {
    if(props.budgets.length === 0) {
        return (
            <div className="budgetList">
                <h3 className="emptyBudget">No Budget yet</h3>
            </div>
        );
    }

    const budgetNodes = props.budgets.map(function(budget) {        
        return (
            <div key={budget._id} className="budget">
                <h3 className="budgetBudget"> Budget: {budget.budget} </h3>
                {DeleteBudget(budget._id)}
            </div>
        );
    });

    return (
        <div className="budgetList">
            {budgetNodes}      
        </div>

    );
};

const ExpenseList = function(props) {
    if(props.expenses.length === 0) {
        return (
            <div className="expenseList">
                <h3 className="emptyExpense">No Expenses yet</h3>
            </div>
        );
    }

    const expenseNodes = props.expenses.map(function(expense) {  
        let necessary;

        if(expense.necessary)
        {
            necessary = "Yes";
        }      
        else if(!expense.necessary)
        {
            necessary = "No";
        }
        return (
            <div key={expense._id} className="expense">
                <h3 className="expenseItem"> Item: {expense.item} </h3>
                <h3 className="expenseCost"> Cost: ${expense.cost} </h3>
                <h3 className="expenseItem"> Type: {expense.type} </h3>
                <h3 className="expenseItem"> Necessary: {necessary} </h3>
                {DeleteExpense(expense._id)}
            </div>
        );
    });

    return (
        <div className="expenseList">
            {expenseNodes}      
        </div>

    );
};

const loadBudgetFromServer = () => {
    sendAjax('GET', '/getBudget', null, (data) => {
        ReactDOM.render(
            <BudgetList budgets={data.budgets} />, document.querySelector("#budgets")
        );
    });
};

const loadExpenseFromServer = () => {
    sendAjax('GET', '/getExpense', null, (data) => {
        ReactDOM.render(
            <ExpenseList expenses={data.expenses} />, document.querySelector("#expenses")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <BudgetList budgets={[]} />, document.querySelector("#budgets")
    );

    ReactDOM.render(
        <ExpenseList expenses={[]} />, document.querySelector("#expenses")
    );

    ReactDOM.render(
        <BudgetForm csrf={csrf} />, document.querySelector("#makeBudget")
    )
    
    ReactDOM.render(
        <ExpenseForm csrf={csrf} />, document.querySelector("#makeExpense")
    )

    loadBudgetFromServer();
    loadExpenseFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});