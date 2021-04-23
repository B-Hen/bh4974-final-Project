const models = require('../models');

const { Budget } = models;

const makerPage = (req, res) => {
  Budget.BudgetModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occureed' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), budgets: docs });
  });
};

const makeBudget = (req, res) => {
  if (!req.body.budget) {
    return res.status(400).json({ error: 'Budget is required!' });
  }

  const BudgetData = {
    budget: req.body.budget,
    owner: req.session.account._id,
  };

  console.log(BudgetData);

  const newBudget = new Budget.BudgetModel(BudgetData);

  const BudgetPromise = newBudget.save();

  BudgetPromise.then(() => res.json({ redirect: '/maker' }));

  BudgetPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Budget already exist.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return BudgetPromise;
};

const getBudget = (request, response) => {
  const req = request;
  const res = response;

  return Budget.BudgetModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ budgets: docs });
  });
};

const deleteBudget = (request, response) => {
  const req = request;
  const res = response;

  return Budget.BudgetModel.findAndDelete(req.body.budgetId, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ message: 'Deleted Budget' });
  });
};


module.exports.makerPage = makerPage;
module.exports.getBudget = getBudget;
module.exports.deleteBudget = deleteBudget;
module.exports.make = makeBudget;
