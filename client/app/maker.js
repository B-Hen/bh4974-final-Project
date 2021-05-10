let _csrf = 0;
let isThereABudget = false;


//method to handle sending the budget to the server 
const handleBudget = (e) => {
    e.preventDefault();

    //if no value enter tell user they need to enter one 
    if($("#BudgetForm").val() == -1) {
        handleError("Budget is required");
        return false;
    }

    loadBudgetFromServerAdd();
    console.log(isThereABudget);

    //if there is a budget and it's new send it to ther server
    if(!isThereABudget){
        sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function() {
            console.log("worked");
        });

        isThereABudget = true;
        document.querySelector("#errorMessage").innerHTML = "Budget has been added!";
    }
    //else tell user the need to update date to change value
    else{
        document.querySelector("#errorMessage").innerHTML = "You already made a budget, go to admin page to update it!";
    }

    return false;
};

//method to send an expense to the serber 
const handleExpense = (e) => {
    e.preventDefault();

    //if any field is empty tell user all fields are reuired 
    if($("#expenseItem").val() == '' || $("#expenseCost").val() == -1 || $("#expenseType").val() == '' || $("#expenseNecessary").val() == '') {
        handleError("All fields are required");
        return false;
    }
    
    //send information to the server 
    sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function() {
        console.log("worked");
        document.querySelector("#errorMessage").innerHTML = "Expense has been added!";
    });

    return false;
};


//method to tell server to delete a budget from the server
const handleDeleteBudget = (e) => {
    e.preventDefault();

    const csrf = _csrf;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&budgetId=${id}`;

    //send info and reload the budget 
    sendAjax('POST', $("#budgetDelete").attr("action"), deleteData, function() {
        loadBudgetFromServer();
        isThereABudget = false;
    });

    return false;
};

//method to tell serber to update a budget and make a new form to put updated calue in 
 const handleUpdateBudget = (e) => {
     e.preventDefault();
     
     const csrf = _csrf;
     const id = e.currentTarget.getAttribute('name');

     ReactDOM.render(
        <UpdateBudgetForm csrf={csrf}  _id={id}/>, document.querySelector("#budgets")
    )
 };

 //method to send the updated budget to the server
 const handleBudgetUpdateDatabase = (e) => {
     e.preventDefault();

     //if there is no value tell user they need to enter something in for it to be sent 
     if($("#updatebudget").val() == -1 || $("#updatebudget").val() == '') {
        handleError("Budget is required");
        return false;
    }

    //send the new budget to the server
    sendAjax('POST', $("#UpdateBudgetForm").attr("action"), $("#UpdateBudgetForm").serialize(), function() {
        loadBudgetFromServer();
    });

    return false;

 };

 //method to delete an expense from the server 
const handleDeleteExpense = (e) => {
    e.preventDefault();

    //const csrf = document.querySelector('input[name="_csrf"]').value;
    const csrf = _csrf;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&expenseId=${id}`;

    sendAjax('POST', $("#expenseDelete").attr("action"), deleteData, function() {
        loadExpenseFromServer();
  
    });

    return false;
};

//method to edit an expense that will later be sent to the sever 
const handleEditExpense = (e) => {
    e.preventDefault();

    //const csrf = document.querySelector('input[name="_csrf"]').value;
    const csrf = _csrf;
    const id = e.currentTarget.getAttribute('name');

    console.log(id);

    ReactDOM.render(
         <EditExpenseForm csrf={csrf} id={id}/>, document.getElementById(`${id}`) 
     )
};

//method to send update information to the database and then reload the expense 
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

//react compenet for the budget 
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
            <input id="budget" type="number" name="budget" placeholder="0.99" min="0" step="0.1"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeBudgetSubmit" type="submit" value="Make Budget" />
        </form>
    );
};

//react compone for update form 
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
            <input id="updatebudget" type="number" name="updatebudget" placeholder="0.99" min="0" step="0.01" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="hidden" name="_id" value={props._id} />
            <input className="makeUpdateBudgetSubmit" type="submit" value="Update Budget" />
        </form>
    );
};

//react component to delete a budget 
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

//react compinent to update a budget 
const UpdateBudget = (props) => {
    return (
        <button id="updateBudget"
        onClick={handleUpdateBudget}
        name={props}
        className="updateBudget"
        >Update Budget</button>
    )
}

//react component for the expense form 
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


//react component for the edit expense form 
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

//react component for delete expense button 
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

//react component for edit expense button 
const EditExpense = (props) => {
    return (
        <button id="editExpense"
        onClick={handleEditExpense}
        name={props}
        className="editExpense"
        >Edit Expense</button>
    )
}

//react componet to hold a list of objects from ther database sent from server 
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

//react compinent to hold the budgets sent from server from database for the app portion of the app
const BudgetListApp = function(props) {
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
            </div>
        );
    });

    return (
        <div className="budgetList">
            {budgetNodes}      
        </div>

    );
};


//react componet to hold a list of expense objects from the database sent from the server 
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
                <span>{DeleteExpense(id)}</span>
                <span>{EditExpense(id)}</span>
            </div>
        );
    });

    return (
        <div className="expenseList">
            {expenseNodes}      
        </div>

    );
};

//react component of a list of expenses for the app potion of the site 
const ExpenseListApp = function(props) {
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
            </div>
        );
    });

    return (
        <div className="expenseList">
            {expenseNodes}      
        </div>

    );
};

//function to load budget from the server
const loadBudgetFromServer = () => {
    sendAjax('GET', '/getBudget', null, (data) => {
        ReactDOM.render(
            <BudgetList budgets={data.budgets} />, document.querySelector("#budgets")
        );
    });
};

//function to load bugets from the server for the app portion of the site 
const loadBudgetFromServerApp = () => {
    let budget;
    let month = 0, week = 0, day = 0;
    let totalSpent = 0, moneyLeftToSpend = 0;
    let expenses;

    sendAjax('GET', '/getBudget', null, (data) => {
        budget = data.budgets;
        console.log(budget);

        if(budget.length > 0)
        {
            budget = data.budgets[0].budget;

            sendAjax('GET', '/getExpense', null, (data) => {
                expenses = data.expenses;
                console.log(expenses);

                for(let i = 0; i < expenses.length; i++)
                {
                    totalSpent += expenses[i].cost;
                }

                moneyLeftToSpend = budget - totalSpent;

                month = budget - totalSpent;
                week = (budget - totalSpent)/4;
                day = (budget - totalSpent)/30;

                console.log(month +  " " + week + " " + day);
                document.querySelector("#appMessage").innerHTML =   `Budget: $${budget.toFixed(2)} | Total Spent: $${totalSpent.toFixed(2)} | Money left to spend: $${moneyLeftToSpend.toFixed(2)}
                <br>Left for the month: $${month.toFixed(2)} | Left for the week: $${week.toFixed(2)}  |  Left for the day: $${day.toFixed(2)}`;
            });
        }

        ReactDOM.render(
            <BudgetListApp budgets={data.budgets} />, document.querySelector("#budgets")
        );
    });
};

//function to load budget from the server for the app portion of the site 
const loadBudgetFromServerAdd = () => {
    sendAjax('GET', '/getBudget', null, (data) => {
        console.log(data.budgets.length);
        if(data.budgets.length == 1)
        {
            isThereABudget = true;
        }
    });
};

//function to load expense from the server 
const loadExpenseFromServer = () => {
    sendAjax('GET', '/getExpense', null, (data) => {
        ReactDOM.render(
            <ExpenseList expenses={data.expenses} />, document.querySelector("#expenses")
        );
    });
};

//function to load expense from the server for the app portion of the site 
const loadExpenseFromServerApp = () => {
    sendAjax('GET', '/getExpense', null, (data) => {
        ReactDOM.render(
            <ExpenseListApp expenses={data.expenses} />, document.querySelector("#expenses")
        );
    });
};

//function to load expense but to also rewrite thereact component and properly display it on the site
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
                    <span> {DeleteExpense(id)} </span>
                    <span>{EditExpense(id)}</span>
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



//react compinent to make the home page / landing page 
const Home = (props) => {
    return(
        <div id="app">
        <h1>Welcome to the Budget and Expense Tracker App</h1>
        <p>Head to the Edit Tab to enter a Budget and some expenses!</p>
        <p>Head to the App Page to see those Buget and Expenses that you made before</p>
        <p>Head to Admin to look at all the Expense and Budgets</p>
        <p>And don't forget to logout when done :)</p>
        <input type="hidden" name="_csrf" value={props} />
        </div>
    );
}

//react component to make the documentation page 
const Documentation = () => {
    return(
        <div id="documentation">
            <h1>Documentation</h1>
            <h2>Site Purpose</h2>
            <p className="Doc">For this project I wanted to expanded my project 1 to include using MongoDB, React, and a MVP model. The purpose is similiar to the first, the app allows users to enter a budget that is then broken down into how much the user should spend for the month, week, and day. The user will also be able to enter in as many expense they want which is then factor into how they must budget. User can also update that budget anytime they want and edit it, the same with expenses. User can make there own account and if they need to they can also change the password to that account. The purpose of the app is to help user manange and save their money by budgeting and keeping track of their expenses. I am also using React to render most things on the site.</p>
            <hr></hr>
            <h2>Database</h2>
            <p className="Doc">This project uses MongoDB to store user accounts, budgets, and expenese. From the database I can pull the user information and display it back to them. I can also use the app to change values of users budgets and edit user expenses, or delete both. All changes are then reflected in the database and stored for future use.</p>
            <hr></hr>
            <h2>What went right and what went wrong?</h2>
            <p className="Doc">I'll start with what went right :). I was able to fully convert my project 1 to use MongoDB, React, MVP model, etc which was the core. I was also able to update the CSS and in my opinion looks way more modern than my first project and is simpler to look at. I was also able to to make different user accounts that are all to some level secure. I was also able to make it so user can change their passwords and I was able to do it pretty quickly, something I thought would take me a very long time so I am very happy with it. I was also able to display to the user important information about how much they should budget for the month, week, day. But of course there are problems as well. THe biggest is I had so many other finals and projects due at the same time in addition to work so I didn't have tome to implement some cool features. The biggest thing I wanted to add was sorting expenses so that the user can choose what type of data was displayed making it easier to track spending habits. I also thoought of using D3 to make some really nice charts to go with displaying spending habits to make things more user friend, (plus I am learning D3 for another class right now). But I didn't get the time to explore that option. I really like where this project is going so I think over the summer I am going to continue working on it to add those features! Also I keep getting this weird error for React components and I am not sure how to fix it without completely rewrittening my code, but since I don't have time to fix it and it's just a warning I'll leave it be and work on it over the summer.</p>
            <hr></hr>
            <h2>If I continue...</h2>
            <p className="Doc">If I continue I really want to add some way to sort the expenese as well as a way to add D3 into the project so I can use graphs to show spending habits making it easier for the user to understand. And if at all possible I think this would be cool to link to an actual bank account and update the expense and such automatically.</p>
            <hr></hr>
            <h2>Above and Beyond</h2>
            <p className="Doc">I think I went above and beyond in the CSS of the app. I think it looks way nicer than in my first project and I think it looks a lot more modern than the first project. I also did all the CSS myself. The design is simple and easy to navigate and once again I was able to add so neat litle animation with the CSS that makes looking throught expense a bit nicer too.</p>
            <hr></hr>
            <h2>Resources</h2>
            <p className="Doc">CSS and HTML doc: <a className="docLink" href="https://www.w3schools.com/">w3schools.com</a></p>
            <p className="Doc">MongoDB doc: <a className="docLink" href="https://docs.mongodb.com/">docs.mongodb.com</a></p>
        </div>
    )
}

//function to creat the app window 
const createAppWindow = (csrf) => {
    loadBudgetFromServerApp();
    loadExpenseFromServerApp();

    ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
    document.querySelector("#errorMessage").innerHTML = "";
    ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
}


//function to create the Add window of the site 
const createAddWindow = (csrf) => {
    document.querySelector("#appMessage").innerHTML = "";
    ReactDOM.render(
        <BudgetForm csrf={csrf} />, document.querySelector("#makeBudget")
    );
    ReactDOM.render(
        <ExpenseForm csrf={csrf} />, document.querySelector("#makeExpense")
    );

    ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
    document.querySelector("#errorMessage").innerHTML = "";
    ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
}

//function to make the home window of the site
const createHomeWindow = (csrf) => {
    document.querySelector("#appMessage").innerHTML ="";
    ReactDOM.render(
        <Home csrf={csrf}/>,
        document.querySelector("#home")
    );

    ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
    document.querySelector("#errorMessage").innerHTML = "";
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
}

//function to creat the documentation window of the site 
const createDocumentationWindow = () => {

    ReactDOM.render(
        <Documentation/>,
        document.querySelector("#doc")
    );

    document.querySelector("#appMessage").innerHTML ="";
    document.querySelector("#errorMessage").innerHTML = "";
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#budgets"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#expenses"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
}

//function to creat the admin window of the site 
const createAdminWindodw = (csrf) => {
    document.querySelector("#appMessage").innerHTML ="";
    ReactDOM.render(
        <BudgetList budgets={[]} />, document.querySelector("#budgets")
    );

    ReactDOM.render(
        <ExpenseList expenses={[]} />, document.querySelector("#expenses")
    );

    loadBudgetFromServer();
    loadExpenseFromServer();

    ReactDOM.unmountComponentAtNode(document.querySelector("#doc"));
    document.querySelector("#errorMessage").innerHTML = "";
    ReactDOM.unmountComponentAtNode(document.querySelector("#home"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeBudget"));
    ReactDOM.unmountComponentAtNode(document.querySelector("#makeExpense"));
}

//function to setup the site and give each button a function and set up a lading page 
const setup = function(csrf) {
    _csrf = csrf;

    const homeButton = document.querySelector("#homeButton");
    const editButton = document.querySelector("#addButton");
    const appButton = document.querySelector("#appButton");
    const adminButton = document.querySelector("#adminButton")
    const docButton = document.querySelector("#documentationButton");

    homeButton.addEventListener("click", (e) => {
        e.preventDefault();
        createHomeWindow(csrf);
        return false;
    });

    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAddWindow(csrf);
        return false;
    });

    appButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAppWindow(csrf);
        return false;
    });

    adminButton.addEventListener("click" , (e) => {
        e.preventDefault();
        createAdminWindodw(csrf);
        return false;
    });

    docButton.addEventListener("click", (e) => {
        e.preventDefault();
        createDocumentationWindow();
        return false;
    })

    loadBudgetFromServerAdd();
    createHomeWindow(csrf);
};

//function to het the csrf of the page 
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

//function to get a token for the page
$(document).ready(function() {
    getToken();
});