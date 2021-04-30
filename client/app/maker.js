const handleBudget = (e) => {
    e.preventDefault();

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
};

 const handleUpdateBudget = (e) => {
     e.preventDefault();
     
     const csrf = document.querySelector('input[name="_csrf"]').value;
     const id = e.currentTarget.getAttribute('name');

     ReactDOM.render(
        <UpdateBudgetForm csrf={csrf}  _id={id}/>, document.querySelector("#budgets")
    )
 };

 const handleBudgetUpdateDatabase = (e) => {
     e.preventDefault();

     if($("#updatebudget").val() == -1) {
        handleError("Budget is required");
        return false;
    }

    sendAjax('POST', $("#UpdateBudgetForm").attr("action"), $("#UpdateBudgetForm").serialize(), function() {
        loadBudgetFromServer();
    });

    return false;

 };

const handleDeleteExpense = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&expenseId=${id}`;

    sendAjax('POST', $("#expenseDelete").attr("action"), deleteData, function() {
        loadExpenseFromServer();
    });

    return false;
};

const handleEditExpense = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    console.log(id);

    ReactDOM.render(
         <EditExpenseForm csrf={csrf} id={id}/>, document.getElementById(`${id}`) 
     )
};

const handleEditExpenseDatabase = (e) => {
    e.preventDefault();

    if($("#editexpenseItem").val() == '' || $("#editexpenseCost").val() == -1 || $("#editexpenseType").val() == '' || $("#editexpenseNecessary").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    sendAjax('POST', $("#editexpenseForm").attr("action"), $("#editexpenseForm").serialize(), function() {
        loadExpense();
    });

    return false;
}

const BudgetForm = (props) => {
    return (
        <form id="BudgetForm"
        onSubmit={handleBudget}
        name="BudgetForm"
        action="/maker"
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

const UpdateBudgetForm = (props) => {
    return (
        <form id="UpdateBudgetForm"
        onSubmit={handleBudgetUpdateDatabase}
        name="UpdateBudgetForm"
        action="/updateBudget"
        method="POST"
        className="UpdateBudgetForm"
        >
            <label htmlFor="Budget">Budget </label>
            <input id="updatebudget" type="number" name="updatebudget" placeholder="0" min="0" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="hidden" name="_id" value={props._id} />
            <input className="makeUpdateBudgetSubmit" type="submit" value="Update Budget" />
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

const UpdateBudget = (props) => {
    return (
        <button id="updateBudget"
        onClick={handleUpdateBudget}
        name={props}
        className="updateBudget"
        >Update Budget</button>
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
            <input className="makeExpenseSubmit" type="submit" value="Make Expense" />

        </form>
    );
};

const EditExpenseForm = (props) => {
    return (
        <form id="editexpenseForm"
        onSubmit={handleEditExpenseDatabase}
        name="editexpenseForm"
        action="/editExpense"
        method="POST"
        className="editexpenseForm"
        >
            <label htmlFor="item">Item: </label>
            <input id="editexpenseItem" type="text" name="item" placeholder="Ex. Banana" />
            <label htmlFor="cost">Cost: </label>
            <input id="editexpenseCost" type="number" name="cost" placeholder="0.99" min="0.0" step="0.01"/>
            <label htmlFor="type">Type: </label>
            <select name="type" id="editexpenseType">
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
            <select name="necessary" id="editexpenseNecessary">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="hidden" name="_id" value={props.id} />
            <input className="editExpenseSubmit" type="submit" value="Edit Expense" />

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

const EditExpense = (props) => {
    return (
        <button id="editExpense"
        onClick={handleEditExpense}
        name={props}
        className="editExpense"
        >Edit Expense</button>
    )
}

const BudgetList = function(props) {
    if(props.budgets.length === 0) {
        return (
            <div className="budgetList">
                <h3 className="emptyBudget">No Budget yet</h3>
            </div>
        );
    }

    const budgetNodes = props.budgets.map(function(budget) { 
        let _id = budget._id;     
        return (
            <div key={budget._id} className="budget">
                <h3 className="budgetBudget"> Budget: {budget.budget} </h3>
                {DeleteBudget(_id)}
                {UpdateBudget(_id)}
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
        let id = expense._id;

        if(expense.necessary)
        {
            necessary = "Yes";
        }      
        else if(!expense.necessary)
        {
            necessary = "No";
        }
        return (
            <div key={expense._id} className="expense" id={expense._id}>
                <span className="expenseItem"> Item: {expense.item} </span>
                <span className="expenseCost"> Cost: ${expense.cost} </span>
                <span className="expenseItem"> Type: {expense.type} </span>
                <span className="expenseItem"> Necessary: {necessary} </span>
                {DeleteExpense(id)}
                {EditExpense(id)}
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

const loadExpense = () => {
    let ExpenseList1 = function(props) {
        if(props.expenses.length === 0) {
            return (
                <div className="expenseList">
                    <h3 className="emptyExpense">No Expenses yet</h3>
                </div>
            );
        }
    
        const expenseNodes = props.expenses.map(function(expense) {  
            let necessary;
            let id = expense._id;
    
            if(expense.necessary)
            {
                necessary = "Yes";
            }      
            else if(!expense.necessary)
            {
                necessary = "No";
            }
            return (
                <div key={expense._id} className="expense" id={expense._id}>
                    <span className="expenseItem"> Item: {expense.item} </span>
                    <span className="expenseCost"> Cost: ${expense.cost} </span>
                    <span className="expenseItem"> Type: {expense.type} </span>
                    <span className="expenseItem"> Necessary: {necessary} </span>
                    {DeleteExpense(id)}
                    {EditExpense(id)}
                </div>
            );
        });
    
        return (
            <div className="expenseList">
                {expenseNodes}      
            </div>
    
        );
    };

    sendAjax('GET', '/getExpense', null, (data) => {
        ReactDOM.render(
            <ExpenseList1 expenses={data.expenses} />, document.querySelector("#expenses")
        );
    });
}

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