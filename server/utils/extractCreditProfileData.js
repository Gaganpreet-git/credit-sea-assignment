const getFullAddress = require("./getFullAddress");

const extractCreditProfileData = (result) => {
  const profile = result.INProfileResponse;

  const applicationDetails =
    profile.Current_Application?.[0]?.Current_Application_Details?.[0];
  const applicant = applicationDetails?.Current_Applicant_Details?.[0];

  const summary = profile.CAIS_Account?.[0]?.CAIS_Summary?.[0];
  const creditAccounts = profile.CAIS_Account?.[0]?.CAIS_Account_DETAILS || [];

  const creditProfileData = {
    name: `${applicant.First_Name?.[0] || ""} ${
      applicant.Last_Name?.[0] || ""
    }`.trim(),
    mobilePhone: applicant.MobilePhoneNumber?.[0] || "",
    pan: creditAccounts[0]?.CAIS_Holder_Details?.[0]?.Income_TAX_PAN?.[0] || "",
    creditScore: Number(profile.SCORE?.[0]?.BureauScore?.[0]) || 0,
    reportSummary: {
      totalAccounts:
        Number(summary?.Credit_Account?.[0]?.CreditAccountTotal?.[0]) || 0,
      activeAccounts:
        Number(summary?.Credit_Account?.[0]?.CreditAccountActive?.[0]) || 0,
      closedAccounts:
        Number(summary?.Credit_Account?.[0]?.CreditAccountClosed?.[0]) || 0,
      currentBalanceAmount:
        Number(
          summary?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_All?.[0]
        ) || 0,
      securedAccountsAmount:
        Number(
          summary?.Total_Outstanding_Balance?.[0]
            ?.Outstanding_Balance_Secured?.[0]
        ) || 0,
      unsecuredAccountsAmount:
        Number(
          summary?.Total_Outstanding_Balance?.[0]
            ?.Outstanding_Balance_UnSecured?.[0]
        ) || 0,
      last7DaysCreditEnquiries:
        Number(profile?.TotalCAPS_Summary?.[0]?.TotalCAPSLast7Days?.[0]) || 0,
    },
    creditAccounts: creditAccounts.map((account) => ({
      creditCardBank: account?.Subscriber_Name?.[0] || "",
      accountNumber: account?.Account_Number?.[0] || "",
      address: getFullAddress(account?.CAIS_Holder_Address_Details),
      amountOverdue: Number(account?.Amount_Past_Due?.[0]) || 0,
      currentBalance: Number(account?.Current_Balance?.[0]) || 0,
    })),
  };

  return creditProfileData;
};

module.exports = extractCreditProfileData;
