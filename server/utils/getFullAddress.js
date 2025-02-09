const getFullAddress = (addressDetails) => {
    if (!addressDetails || addressDetails.length === 0) return "";
  
    const addressParts = [
      addressDetails[0]?.First_Line_Of_Address_non_normalized?.[0] || "",
      addressDetails[0]?.Second_Line_Of_Address_non_normalized?.[0] || "",
      addressDetails[0]?.Third_Line_Of_Address_non_normalized?.[0] || "",
      addressDetails[0]?.City_non_normalized?.[0] || "",
      addressDetails[0]?.State_non_normalized?.[0] || "",
      addressDetails[0]?.ZIP_Postal_Code_non_normalized?.[0] || "",
      addressDetails[0]?.CountryCode_non_normalized?.[0] || "",
    ];
  
    return addressParts.filter((part) => part.trim() !== "").join(", ");
  };

  module.exports = getFullAddress;