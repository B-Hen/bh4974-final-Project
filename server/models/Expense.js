const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let ExpenseModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ExpenseSchema = new mongoose.Schema({
  item: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },

  cost: {
    type: Number,
    reuired: true,
    min: 0,
  },

  type: {
    type: String,
    require: true,
    trim: true,
  },

  necessary: {
    type: Boolean,
    require: true,
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

ExpenseSchema.statics.toAPI = (doc) => ({
  item: doc.item,
  cost: doc.cost,
  type: doc.type,
  necessary: doc.necessary,
});

ExpenseSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ExpenseModel.find(search).select('item cost type necessary').lean().exec(callback);
};

ExpenseSchema.statics.findAndDelete = (indexId, callback) => {
  const search = {
    _id: convertId(indexId),
  };

  ExpenseModel.deleteOne(search).lean().exec(callback);
};

ExpenseSchema.statics.findAndEdit = (indexID, indexItem, indexCost, indexType, indexNecessary, callback) => {
  ExpenseModel.updateOne(
    { _id: convertId(indexID) },
    {
      $set: {
        item: indexItem,
        cost: indexCost,
        type: indexType,
        necessary: indexNecessary,
      },
    },
  ).lean().exec(callback);
};


ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports.ExpenseModel = ExpenseModel;
module.exports.ExpenseSchema = ExpenseSchema;
