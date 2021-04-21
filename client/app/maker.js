const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

const handleBudget = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#BudgetForm").val() == -1) {
        handleError("Budget is required");
        return false;
    }
    console.log($("#BudgetForm").serialize());

    sendAjax('POST', $("#BudgetForm").attr("action"), $("#BudgetForm").serialize(), function() {
        console.log("worked check mongo Compass");
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

    console.log($("#expenseForm").serialize());
    sendAjax('POST', $("#expenseForm").attr("action"), $("#expenseForm").serialize(), function() {
        console.log("check mongo");
    });

    return false;
};

const handleDeleteDomo = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;
    const id = e.currentTarget.getAttribute('name');

    const deleteData = `_csrf=${csrf}&domoId=${id}`;

    sendAjax('POST', $("#domoDelete").attr("action"), deleteData, function() {
        loadDomosFromServer();
    });

    return false;
}

const DeleteButton = (props) => {
    return (
        <button id="domoDelete"
        onClick={handleDeleteDomo}
        name={props}
        action="/deleteDomo"
        method="POST"
        className="domoDelete"
        key=""
        >Delete Domo</button>
    )
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
        onSubmit={handleDomo}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
            <label htmlFor="level">Level: </label>
            <input id="domoLevel" type="text" name="level" placeholder="Domo Level" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />

        </form>
    );
};

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
            </div>
        );
    });

    return (
        <div className="budgetList">
            {budgetNodes}      
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const loadBudgetFromServer = () => {
    sendAjax('GET', '/getBudget', null, (data) => {
        ReactDOM.render(
            <BudgetList budgets={data.budgets} />, document.querySelector("#budget")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    ReactDOM.render(
        <BudgetList budgets={[]} />, document.querySelector("#budget")
    );

    ReactDOM.render(
        <BudgetForm csrf={csrf} />, document.querySelector("#makeBudget")
    )

    ReactDOM.render(
        <ExpenseForm csrf={csrf} />, document.querySelector("#makeExpense")
    )

    loadBudgetFromServer();
    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});