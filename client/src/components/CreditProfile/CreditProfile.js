import React from "react";
import "./CreditProfile.css";

const CreditProfile = ({ data }) => {
  console.log('data:', data);
  if (!data) return <p>Loading...</p>;

  const {
    name,
    mobilePhone,
    pan,
    creditScore,
    reportSummary,
    creditAccounts,
  } = data;

  return (
    <div className="credit-profile">
      {/* Header Section */}
      <div className="profile-header">
        <h2>{name}</h2>
        <p><strong>Mobile:</strong> {mobilePhone}</p>
        <p><strong>PAN:</strong> {pan}</p>
        <p><strong>Credit Score:</strong> {creditScore}</p>
      </div>

      {/* Report Summary */}
      <div className="report-summary">
        <h3>Report Summary</h3>
        <ul>
          <li><strong>Total Accounts:</strong> {reportSummary.totalAccounts}</li>
          <li><strong>Active Accounts:</strong> {reportSummary.activeAccounts}</li>
          <li><strong>Closed Accounts:</strong> {reportSummary.closedAccounts}</li>
          <li><strong>Current Balance:</strong> ₹{reportSummary.currentBalanceAmount}</li>
          <li><strong>Secured Amount:</strong> ₹{reportSummary.securedAccountsAmount}</li>
          <li><strong>Unsecured Amount:</strong> ₹{reportSummary.unsecuredAccountsAmount}</li>
          <li><strong>Last 7 Days Credit Enquiries:</strong> {reportSummary.last7DaysCreditEnquiries}</li>
        </ul>
      </div>

      {/* Credit Accounts List */}
      <div className="credit-accounts">
        <h3>Credit Accounts</h3>
        {creditAccounts.map((account) => (
          <div key={account._id.$oid} className="credit-card">
            <h4>{account.creditCardBank}</h4>
            <p><strong>Account Number:</strong> {account.accountNumber}</p>
            <p><strong>Address:</strong> {account.address}</p>
            <p><strong>Amount Overdue:</strong> ₹{account.amountOverdue}</p>
            <p><strong>Current Balance:</strong> ₹{account.currentBalance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditProfile;
