const { parseString } = require("xml2js");
const { creditProfileService } = require("../services");
const { ApiError, CatchAsync, extractCreditProfileData } = require("../utils");

/**
 * Controller to handle the upload of a credit profile in XML format.
 * It validates the file type, parses the XML, extracts relevant data,
 * and saves it using the creditProfileService.
 */
const uploadCreditProfile = async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    throw new ApiError(400, "No file uploaded.");
  }

  const fileType = req.file.mimetype;

  // Validate that the uploaded file is an XML file
  if (fileType !== "text/xml" && fileType !== "application/xml") {
    throw new ApiError(400, "Invalid file format. Only XML is allowed.");
  }

  // Convert the file buffer to a string
  const xmlData = req.file.buffer.toString();

  // Parse the XML data
  parseString(xmlData, (err, result) => {
    if (err) {
      throw new ApiError(500, "Error parsing XML file.");
    }

    // Extract relevant data from the parsed XML
    const creditProfileData = extractCreditProfileData(result);

    // Save the extracted credit profile data
    creditProfileService.saveCreditProfile(creditProfileData);

    // Send the extracted data as a response
    res.status(200).json({
      message: "Credit profile uploaded and saved successfully.",
      code: 200,
    });
  });
};

/**
 * Controller to retrieve a credit profile based on a PAN (Permanent Account Number).
 * It queries the creditProfileService and returns the profile if found.
 */
const getCreditProfile = async (req, res) => {
  const profile = await creditProfileService.getCreditProfileByPAN(
    req.query.pan
  );

  // Return a 404 error if the profile is not found
  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  // Send the profile as a JSON response
  res.json(profile);
};

// Export the controllers with error handling using CatchAsync
module.exports = {
  uploadCreditProfile: CatchAsync(uploadCreditProfile),
  getCreditProfile: CatchAsync(getCreditProfile),
};
