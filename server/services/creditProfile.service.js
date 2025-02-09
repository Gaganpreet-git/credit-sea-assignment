const { CreditProfileModel } = require("../models");

const saveCreditProfile = async (creditProfileData) => {
  const { pan, ...updateData } = creditProfileData;
  const updatedCreditProfile = await CreditProfileModel.findOneAndUpdate(
    { pan },
    { $set: updateData },
    { new: true }
  );

  if (!updatedCreditProfile) {
    const newCreditProfile = new CreditProfileModel(creditProfileData);
    await newCreditProfile.save();
    return newCreditProfile;
  }

  return updatedCreditProfile;
};

const getCreditProfileByPAN = async (pan) => {
  const creditProfile = await CreditProfileModel.findOne({ pan });
  return creditProfile;
};

module.exports = {
  saveCreditProfile,
  getCreditProfileByPAN,
};
