const mongoose = require("mongoose");

const creditProfileSchema = new mongoose.Schema(
  {
    // Basic Details
    name: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
      // unique: true,
    },
    creditScore: {
      type: Number,
      required: true,
    },

    // Report Summary
    reportSummary: {
      totalAccounts: { type: Number, required: true },
      activeAccounts: { type: Number, required: true },
      closedAccounts: { type: Number, required: true },
      currentBalanceAmount: { type: Number, required: true },
      securedAccountsAmount: { type: Number, required: true },
      unsecuredAccountsAmount: { type: Number, required: true },
      last7DaysCreditEnquiries: { type: Number, required: true },
    },

    // Credit Accounts Information
    creditAccounts: [
      {
        creditCardBank: {
          type: String,
          required: true,
        },
        accountNumber: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        amountOverdue: {
          type: Number,
          required: true,
        },
        currentBalance: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditProfile", creditProfileSchema);
