const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let BudgetModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const BudgetSchema = new mongoose.Schema({
  budget: {
    type: Number,
    min: 0,
    require: true,
    set: setName,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BudgetSchema.statics.toAPI = (doc) => ({
  budget: doc.budget,
});

BudgetSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return BudgetModel.find(search).select('budget').lean().exec(callback);
};

BudgetSchema.statics.findAndDelete = (indexId, callback) => {
  const search = {
    _id: convertId(indexId),
  };

  BudgetModel.deleteOne(search).lean().exec(callback);
};

BudgetSchema.statics.findAndUpdate = (indexId, indexBudget, callback) => {
 
  BudgetModel.updateOne(
    {_id : convertId(indexId)},
    {
      $set: {"budget" : indexBudget}
    }
  ).lean().exec(callback);
};


BudgetModel = mongoose.model('Budget', BudgetSchema);

module.exports.BudgetModel = BudgetModel;
module.exports.BudgetSchema = BudgetSchema;

