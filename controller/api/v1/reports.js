const Report = require("../../../models/reports");

//Find all reports with same status
exports.status = async (req, res) => {
  try {
      //console.log(req.params.status);
    if(
        req.params.status!="Negative" &&
        req.params.status!="Travelled-Quarantine" &&
        req.params.status!="Symptoms-Quarantine" &&
        req.params.status!="Positive-Admit" 
    ){
        return res.status(400).json({
            success: false,
            msg:'Incorrect Status!',
            Available_Statuses:'Negative, Travelled-Quarantine, Symptoms-Quarantine Positive-Admit'
        });
    }
    const reports = await Report.find({ status: req.params.status })
      .populate("patients")
      .populate("doctors");

    // Creating object to send back to the user
    let result = {};
    // No of cases that have this status
    result.caseCount = reports.length;
    let ans = [];
    // Fetching doctors name and patients details
    for (let i = 0; i < reports.length; i++) {
      let patients = {};
      patients.name = reports[i].patients.name;
      patients.phone = reports[i].patients.phone;
      ans.push({
        doctors: reports[i].doctors.name,
        patients: patients
      });
    }
    result.report = ans;

    // Return response
    return res.status(200).json({
      success: true,
      body: result,
      msg:'All reports with the status!'
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};