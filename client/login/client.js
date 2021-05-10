//method to send a login to the server throw error when feilds are missing or not matching
const handleLogin = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }
    
    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

//method to send a new account to the server throw error when feilds are missing or not matching
const handleSignup = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

//method to send a new passwaor to the server and database throw error when feilds are missing or not matching
const handleChangePassword = (e) => {
    e.preventDefault();

    const csrf = document.querySelector('input[name="_csrf"]').value;

    createPassWordWindow(csrf);
};

//function to change a password and throw error when new pass not matching and fields are missing 
const handleChangePass = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass2").val() !== $("#pass3").val()) {
        handleError("Passwords do not match");
        return false;
    }

    console.log($("#changePasswordForm").serialize());

    sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), function(){
        document.querySelector("#errorMessage").innerHTML = "Password has been change";
    });

    return false;
}

//react componet for Login for the site 
const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
        onSubmit={handleLogin}
        action="/login"
        method="POST"
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" id="loginSubmit" type="submit" value="Sign in" />
        </form>
    );
};


//react component for sign up window of the site 
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
        name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" id="signupSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

//react compenet for change password window for the site 
const ChangePasswordWindow = (props) => {
    return (
        <form id="changePasswordForm"
        name="changePasswordForm"
        onSubmit={handleChangePass}
        action="/changePass"
        method="POST"
        className="changePassForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass2">New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="new password" />
            <label htmlFor="pass3">New Password: </label>
            <input id="pass3" type="password" name="pass3" placeholder="retype new password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" id="changePass" type="submit" value="Change Password" />
        </form>
    );
};

//method to change the password 
const ChangePasswordButton = (props) => {
    return (
        <button 
        id="changePasswordButton"
        name={props}
        onClick={handleChangePassword}
        className="changePasswordButton">

            Change Password
        </button>
    )
}

//method to creat a login for the site usinf reactDOM
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );

    ReactDOM.render(
        <ChangePasswordButton csrf={csrf} />,
        document.querySelector("#passButton")
    )

    document.querySelector("#errorMessage").innerHTML = "";
};

//function to creat signup for the site with REACTDOM 
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );

    ReactDOM.render(
        <ChangePasswordButton csrf={csrf} />,
        document.querySelector("#passButton")
    );
    document.querySelector("#errorMessage").innerHTML = "";
};


//function to create password for the site using REACTDOM
const createPassWordWindow = (csrf) => {
    ReactDOM.render(
        <ChangePasswordWindow csrf={csrf} />,
        document.querySelector("#content")
    );

    ReactDOM.unmountComponentAtNode(document.querySelector("#passButton"));
    document.querySelector("#errorMessage").innerHTML = "";
};

//function to set up intial state of the site, give buttons function and have alnading page 
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signuputton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePasswordButton");

    signuputton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    changePassButton.addEventListener("click", (e)=> {
        e.preventDefault();
        createPassWordWindow(csrf);
        return false;
    });


    createLoginWindow(csrf); //default view
};

//function to get a csrf token 
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});