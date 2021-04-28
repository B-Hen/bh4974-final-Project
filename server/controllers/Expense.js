const models = require('../models');

const { Expense } = models;

const makerPage = (req, res) => {
  Expense.ExpenseModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occureed' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), budgets: docs });
  });
};

const makeExpense = (req, res) => {
  if (!req.body.item || !req.body.cost || !req.body.type || !req.body.necessary) {
    return res.status(400).json({ error: 'Item, cost, type, and necessary is all required!' });
  }

  let necessaryBool;

  if (req.body.necessary === 'true') {
    necessaryBool = true;
  } else if (req.body.necessary === 'false') {
    necessaryBool = false;
  }

  const ExpenseData = {
    item: req.body.item,
    cost: Number(req.body.cost),
    type: req.body.type,
    necessary: necessaryBool,
    owner: req.session.account._id,
  };

  const newExpense = new Expense.ExpenseModel(ExpenseData);

  const ExpensePromise = newExpense.save();

  ExpensePromise.then(() => res.json({ redirect: '/makerExpense' }));

  ExpensePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Expense already exist.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return ExpensePromise;
};

const getExpense = (request, response) => {
  const req = request;
  const res = response;

  return Expense.ExpenseModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ expenses: docs });
  });
};

const deleteExpense = (request, response) => {
  const req = request;
  const res = response;

  return Expense.ExpenseModel.findAndDelete(req.body.expenseId, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ message: 'Deleted Expense' });
  });
};

const editExpense = (request, response) => {
  const req = request;
  const res = response;

  console.log(req.body.item);
  console.log(req.body.cost);
  console.log(req.body.type);
  console.log(req.body.necessary);
  console.log(req.body._id);

  return Expense.ExpenseModel.findAndEdit(req.body._id, req.body.item,
    req.body.cost, req.body.type, req.body.necessary, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }

      return res.json({ message: 'Edited and Updated Expense' });
    });
};

module.exports.makerPage = makerPage;
module.exports.getExpense = getExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.editExpense = editExpense;
module.exports.make = makeExpense;
