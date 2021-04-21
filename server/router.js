const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecures, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/getBudget', mid.requiresLogin, controllers.Budget.getBudget);
  app.get('/login', mid.requiresSecures, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecures, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecures, mid.requiresLogout, controllers.Account.signup);
  app.post('/deleteDomo', mid.requiresSecures, controllers.Domo.deleteDomos);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/makerBudget', mid.requiresLogin, controllers.Budget.makerPage);
  app.post('/makerBudget', mid.requiresLogin, controllers.Budget.make);
  app.get('/makerExpense', mid.requiresLogin, controllers.Expense.makerPage);
  app.post('/makerExpense', mid.requiresLogin, controllers.Expense.make);
  app.get('/', mid.requiresSecures, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
