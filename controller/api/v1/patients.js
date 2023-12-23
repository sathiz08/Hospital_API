const Patients = require("../../../models/patients");
const Report = require("../../../models/reports");

//Register a patients
exports.registerPatient = async (req, res) => {
  try {
    const { name, phone } = req.body;
    let patients;
    patients = await Patients.find({
      phone
    });
    if (patients.length > 0) {
      return res.status(200).json({
        success: true,
        body: patients[0]
      });
    }
    patients = await Patients.create({
      name,
      phone
    });
    // Return response
    return res.status(201).json({
      success: true,
      body: patients,
      msg:'Patients Registered Sucessfully!'
    });
  } catch (err) {
    // Error handling
    return res.status(401).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//create patients report
module.exports.createReport = async (req, res) => {
  try {
    const { status } = req.body;
    const patients = req.params.id;
    const doctors = req.doctors.id;
    const patientDetails = await Patients.findById(patients);
    const report = await Report.create({
      patients,
      doctors,
      status
    });
    // Add the report details in patients db
    patientDetails.reports.push(report);
    patientDetails.save();

    // Return response
    return res.status(201).json({
      success: true,
      body: report,
      msg:'Report Created Sucessfully!'
    });
  } catch (error) {
    console.log(error);
    // Error handling
    return res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//Fetch All Patients Report
module.exports.allReports = async (req, res) => {
  try {
    const reports = await Patients.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctors" }
    });

    // Creating object to send back to the user
    let ans = {};
    ans.patient_name = reports.name;
    ans.phone = reports.phone;
    ans.reports = [];
    for (let i = 0; i < reports.reports.length; i++) {
      ans.reports.push({
        doctors: reports.reports[i].doctors.name,
        status: reports.reports[i].status
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      body: ans,
      msg:'All reports of the patients!'
    });
  } catch (error) {
    return res.status(400).json({
      success: false
    });
  }
};

