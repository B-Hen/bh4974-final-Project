const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecures, controllers.Account.getToken);
  app.get('/getBudget', mid.requiresLogin, controllers.Budget.getBudget);
  app.get('/getExpense', mid.requiresLogin, controllers.Expense.getExpense);
  app.get('/login', mid.requiresSecures, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecures, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecures, mid.requiresLogout, controllers.Account.signup);
  app.post('/deleteBudget', mid.requiresSecures, controllers.Budget.deleteBudget);
  app.post('/updateBudget', mid.requiresSecures, controllers.Budget.updateBudget);
  app.post('/deleteExpense', mid.requiresSecures, controllers.Expense.deleteExpense);
  app.post('/editExpense', mid.requiresSecures, controllers.Expense.editExpense);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Budget.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Budget.make);
  app.get('/makerExpense', mid.requiresLogin, controllers.Expense.makerPage);
  app.post('/makerExpense', mid.requiresLogin, controllers.Expense.make);
  app.get('/', mid.requiresSecures, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/changePass', mid.requiresSecures, mid.requiresLogout, controllers.Account.changePassword);
};

module.exports = router;
