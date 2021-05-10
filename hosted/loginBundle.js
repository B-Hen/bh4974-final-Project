"use strict";

//method to send a login to the server throw error when feilds are missing or not matching
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; //method to send a new account to the server throw error when feilds are missing or not matching


var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; //method to send a new passwaor to the server and database throw error when feilds are missing or not matching


var handleChangePassword = function handleChangePassword(e) {
  e.preventDefault();
  var csrf = document.querySelector('input[name="_csrf"]').value;
  createPassWordWindow(csrf);
}; //function to change a password and throw error when new pass not matching and fields are missing 


var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass2").val() !== $("#pass3").val()) {
    handleError("Passwords do not match");
    return false;
  }

  console.log($("#changePasswordForm").serialize());
  sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), function () {
    document.querySelector("#errorMessage").innerHTML = "Password has been change";
  });
  return false;
}; //react componet for Login for the site 


var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      id: "loginSubmit",
      type: "submit",
      value: "Sign in"
    }))
  );
}; //react component for sign up window of the site 


var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      id: "signupSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
}; //react compenet for change password window for the site 


var ChangePasswordWindow = function ChangePasswordWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "changePasswordForm",
      name: "changePasswordForm",
      onSubmit: handleChangePass,
      action: "/changePass",
      method: "POST",
      className: "changePassForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "new password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass3"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass3",
      type: "password",
      name: "pass3",
      placeholder: "retype new password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      id: "changePass",
      type: "submit",
      value: "Change Password"
    }))
  );
}; //method to change the password 


var ChangePasswordButton = function ChangePasswordButton(props) {
  return (/*#__PURE__*/React.createElement("button", {
      id: "changePasswordButton",
      name: props,
      onClick: handleChangePassword,
      className: "changePasswordButton"
    }, "Change Password")
  );
}; //method to creat a login for the site usinf reactDOM


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePasswordButton, {
    csrf: csrf
  }), document.querySelector("#passButton"));
  document.querySelector("#errorMessage").innerHTML = "";
}; //function to creat signup for the site with REACTDOM 


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePasswordButton, {
    csrf: csrf
  }), document.querySelector("#passButton"));
  document.querySelector("#errorMessage").innerHTML = "";
}; //function to create password for the site using REACTDOM


var createPassWordWindow = function createPassWordWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePasswordWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.unmountComponentAtNode(document.querySelector("#passButton"));
  document.querySelector("#errorMessage").innerHTML = "";
}; //function to set up intial state of the site, give buttons function and have alnading page 


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signuputton = document.querySelector("#signupButton");
  var changePassButton = document.querySelector("#changePasswordButton");
  signuputton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  changePassButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPassWordWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default view
}; //function to get a csrf token 


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
